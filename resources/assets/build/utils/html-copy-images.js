const path = require('path');
const lodash = require('lodash');
const copyAsset = require('../utils/copyAsset');
const htmlParser = require('htmlparser2');
const srcsetParser = require('srcset');
const css = require('css');

const config = require('../../config');

const manifestReplacer = require('../utils/manifestReplacer')(config.buildMode);

module.exports = (files, options = {}) => {
    const manifest = {};

    const isValidImageSrc = url => url && !/^(http|https):\/\//.test(url);

    const result = files.map(data => {
        const replacements = {};

        const parser = new htmlParser.Parser({
            onopentag(tag, attributes) {
                if (tag === 'img'
                    && isValidImageSrc(attributes.src)
                ) {
                    replacements[ attributes.src ] = attributes.src;
                }
                if (attributes.hasOwnProperty('twig-image-hash')) {
                    const src = attributes[ attributes[ 'twig-image-hash' ] ];

                    if (isValidImageSrc(src)) {
                        replacements[ src ] = src;
                    }
                }
                if (attributes.hasOwnProperty('twig-image-src')) {
                    const attributeNames = attributes[ 'twig-image-src' ]
                        .split('|')
                        .map(
                            name => name.trim()
                        );

                    for (let attributeName of attributeNames) {
                        const src = attributes[ attributeName ];

                        if (isValidImageSrc(src)) {
                            replacements[ src ] = src;
                        }
                    }
                }
                if (attributes.hasOwnProperty('twig-image-srcset')) {
                    const attributeNames = attributes[ 'twig-image-srcset' ]
                        .split('|')
                        .map(
                            name => name.trim()
                        );

                    for (let attributeName of attributeNames) {
                        const srcset = attributes[ attributeName ];
                        const parsed = srcsetParser.parse(srcset);

                        for (let item of parsed) {
                            if (isValidImageSrc(item.url)) {
                                replacements[ item.url ] = item.url;
                            }
                        }
                    }
                }
            },
            onattribute(name, value) {
                if (name === 'style') {
                    const cssObj = css.parse(`body { ${ value } }`);
                    const declarations = lodash.flattenDeep(
                        lodash.map(cssObj.stylesheet.rules, 'declarations')
                    );

                    for (const declaration of declarations) {
                        const urlMatch = declaration.value.match(/url\(?[\'|\"]?(.*?)[\'|\"]?\)/);

                        if (urlMatch && isValidImageSrc(urlMatch[ 1 ])) {
                            replacements[ urlMatch[ 1 ] ] = urlMatch[ 1 ];
                        }
                    }
                }
            }
        });

        parser.write(data.content);
        parser.end();

        for (let src of Object.values(replacements)) {
            const newPath = copyAsset(
                path.resolve(
                    path.dirname(data.path),
                    src
                ),
                options.outputPath,
                options.srcPath,
                options.outputPath,
                src
            );

            if (newPath) {
                if (newPath !== src
                    && options.manifest
                ) {
                    const relativeHashedPath = lodash.trimStart(
                        path.relative(
                            options.staticPath,
                            path.resolve(
                                options.outputPath,
                                newPath
                            ),
                            '/'
                        )
                    );

                    const originalPath = lodash.trimStart(
                        relativeHashedPath.replace(
                            options.hashMask,
                            '',
                            relativeHashedPath
                        ),
                        '/'
                    );

                    const { key: manifestKey, value: manifestValue } = manifestReplacer({
                        key: originalPath,
                        value: relativeHashedPath
                    });

                    manifest[ manifestKey ] = manifestValue;
                }

                data.content = data
                    .content
                    .replace(
                        new RegExp(src, 'g'),
                        newPath
                    )
                    .replace(
                        /\s?(twig\-image\-hash=\"([-|_]*\w*)+\")/g,
                        ''
                    )
                    .replace(
                        /\s?(twig\-image\-src=\"([-|_]*\w*)+\")/g,
                        ''
                    )
                    .replace(
                        /\s?(twig\-image\-srcset\=\"([-|_]*\w*)+\")/g,
                        ''
                    );
            }
        }

        return data;
    });

    return {
        files: result,
        manifest
    };
};
