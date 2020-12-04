const fs = require('fs');
const lodash = require('lodash');
const readDirSync = require('recursive-readdir-sync');

const pluginName = 'CleanupPlugin';

class CleanupPlugin {
    constructor(config) {
        this.config = config;
    }

    apply(compiler) {
        compiler.hooks.done.tap(pluginName, (stats) => {
            const outputPath = compiler.options.output.path;

            let folders = lodash.get(
                this.config,
                'otherFolders',
                []
            );

            folders.push(outputPath);

            const currentFiles = Object.keys(stats.compilation.assets).map(name => `${outputPath}/${name}`);

            const files = folders
                .reduce((carry, fromPath) => carry.concat(
                    this.getFiles(fromPath, currentFiles)
                ), []);

            files.forEach(fs.unlinkSync);

            console.log('\nCleanup: %s file(s) deleted.', files.length);
        });
    }

    getFiles(fromPath, currentFiles = []) {
        if (!fs.existsSync(fromPath)) {
            return [];
        }

        return readDirSync(fromPath).filter(
            (file) => currentFiles.indexOf(file) === -1
        );
    }
}

module.exports = CleanupPlugin;

// function Cleanup(config = {}) {
//     this.config = config;
// }

// Cleanup.prototype.apply = function (compiler) {
//     const outputPath = compiler.options.output.path;

//     let folders = lodash.get(
//         this.config,
//         'otherFolders',
//         []
//     );

//     folders.push(outputPath);

//     compiler.plugin('done', (compiled) => {
//         if (compiler.outputFileSystem.constructor.name !== 'NodeOutputFileSystem') {
//             return;
//         }

//         const currentFiles = lodash.map(
//             compiled.compilation.assets,
//             'existsAt'
//         );

//         const files = folders
//             .reduce((carry, fromPath) => carry.concat(
//                 getFiles(fromPath, currentFiles)
//             ), []);

//         files.forEach(fs.unlinkSync);

//         console.log('\nCleanup: %s file(s) deleted.', files.length);
//     });
// };

// function getFiles(fromPath, currentFiles = []) {
//     if (!fs.existsSync(fromPath)) {
//         return [];
//     }

//     return readDirSync(fromPath).filter(
//         (file) => currentFiles.indexOf(file) === -1
//     );
// }

// module.exports = Cleanup;
