const path = require('path');
const cheerio = require('cheerio');
const copyAsset = require('../utils/copyAsset');
const htmlParser = require('htmlparser2');

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
                } else if (attributes.hasOwnProperty('twig-image-hash')) {
                    const src = attributes[ attributes[ 'twig-image-hash' ] ];

                    if (isValidImageSrc(src)) {
                        replacements[ src ] = src;
                    }
                }
            },
            onattribute(name, value) {
                if (name === 'style'
                    && value.indexOf('background-image') !== -1
                ) {
                    const src = value.match(/background\-image\:\s*url\(?[\'|\"]?(.*?)[\'|\"]?\)/);

                    if (src.length
                        && isValidImageSrc(src[ 1 ])
                    ) {
                        replacements[ src[ 1 ] ] = src[ 1 ];
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
                    const relativeHashedPath = path.relative(
                        options.staticPath,
                        path.resolve(
                            options.outputPath,
                            newPath
                        )
                    );

                    const originalPath = relativeHashedPath.replace(
                        options.hashMask,
                        '',
                        relativeHashedPath
                    );

                    manifest[ originalPath ] = relativeHashedPath;
                }

                data.content = data
                    .content
                    .replace(
                        new RegExp(src, 'g'),
                        newPath
                    )
                    .replace(
                        /\s?(twig\-image\-hash=\"\w+\")/g,
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
