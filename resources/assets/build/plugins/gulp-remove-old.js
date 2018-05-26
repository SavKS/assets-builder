const fs = require('fs');
const path = require('path');
const glob = require('glob');
const through = require('through2');

const remove = (filePath) => {
    const pathInfo = path.parse(filePath);
    const files = glob.sync(
        pathInfo.dir + '/' + pathInfo.base.replace(/\.\w{10}\./, '.*.')
    );

    files
        .filter(otherFilePath => otherFilePath !== filePath)
        .forEach(
            otherFilePath => fs.unlinkSync(otherFilePath)
        );
};

module.exports = function (options = {}) {
    return through.obj(function (file, enc, cb) {
        if (options.manifest) {
            const newFiles = Object.values(
                JSON.parse(
                    file.contents.toString(enc)
                )
            );

            for (let filePath of newFiles) {
                remove(
                    path.resolve(options.staticPath, filePath)
                );
            }
        } else {
            remove(file.path);
        }

        cb(null, file);
    });
};
