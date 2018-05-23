const path = require('path');
const cheerio = require('cheerio');
const through = require('through2');
const copyAsset = require('./copyAsset');

module.exports = function (options = {}) {
    return through.obj(function (file, enc, cb) {
        const $ = cheerio.load(
            file.contents.toString(enc)
        );

        $('img').each(function (i, el) {
            const $self = $(this);

            if (!$self.attr('src')) {
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
