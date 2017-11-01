const fs = require('fs');
const lodash = require('lodash');
const readDirSync = require('recursive-readdir-sync');

function Cleanup(config = {}) {
    this.config = config;
}

Cleanup.prototype.apply = function (compiler) {
    const outputPath = compiler.options.output.path;

    let folders = lodash.get(
        this.config,
        'otherFolders',
        []
    );

    folders.push(outputPath);

    compiler.plugin('done', (compiled) => {
        if (compiler.outputFileSystem.constructor.name !== 'NodeOutputFileSystem') {
            return;
        }

        const currentFiles = lodash.map(
            compiled.compilation.assets,
            'existsAt'
        );

        const files = folders
            .reduce((carry, fromPath) => carry.concat(
                getFiles(fromPath, currentFiles)
            ), []);

        files.forEach(fs.unlinkSync);

        console.log('\nCleanup: %s file(s) deleted.', files.length);
    });
};

function getFiles(fromPath, currentFiles = []) {
    return readDirSync(fromPath).filter(function (file) {
        return currentFiles, file, currentFiles.indexOf(file) === -1;
    });
}

module.exports = Cleanup;