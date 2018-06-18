const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const cheerio = require('cheerio');
const through = require('through2');
const copyAsset = require('../utils/copyAsset');

const appendToManifest = (manifestPath, originalPath, newPath) => {
    let manifest = {};

    if (fs.existsSync(manifestPath)) {
        manifest = JSON.parse(
            fs.readFileSync(manifestPath)
        );
    }

    manifest[originalPath] = newPath;

    const pathInfo = path.parse(manifestPath);

    if (!fs.existsSync(pathInfo.dir)) {
        mkdirp(pathInfo.dir);
    }

    fs.writeFileSync(
        manifestPath,
        JSON.stringify(manifest, null, 4)
    );
};

module.exports = function (options = {}) {
    return through.obj(function (file, enc, cb) {
        const $ = cheerio.load(
            file.contents.toString(enc)
        );

        $('img').each(function (i, el) {
            const $self = $(this);

            if (!$self.attr('src')
                || /^(http|https):\/\//.test($self.attr('src'))
            ) {
                return;
            }

            const newPath = copyAsset(
                path.resolve(
                    path.dirname(file.path),
                    $self.attr('src')
                ),
                options.outputPath,
                options.srcPath,
                options.outputPath,
                $self.attr('src')
            );

            if (newPath) {
                if (newPath !== $self.attr('src')
                    && options.manifest
                ) {
                    const relativeHashedPath = path.relative(
                        options.staticPath,
                        path.resolve(
                            options.outputPath,
                            newPath
                        )
                    );

                    appendToManifest(
                        options.manifest,
                        relativeHashedPath.replace(
                            options.hashMask,
                            '',
                            relativeHashedPath
                        ),
                        relativeHashedPath
                    );
                }

                $self.attr('src', newPath);
            }
        });

        if (file.isBuffer() === true) {
            file.contents = new Buffer(
                $.html()
            );
        }

        cb(null, file);
    });
};
