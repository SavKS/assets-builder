const fs = require('fs');
const gulp = require('gulp');
const config = require('../../config');
const lodash = require('lodash');
const colors = require('colors/safe');
const through = require('through2');

const build = () => {
    let result = {};

    for (let file of config.manifest.files) {
        if (!fs.existsSync(file)) {
            console.log(`[${colors.red('Manifest file not found')}] ${colors.magenta('%s')}`, file);

            continue;
        }

        const manifest = JSON.parse(
            fs.readFileSync(file)
        );

        result = Object.assign({}, result, manifest);
    }

    fs.writeFileSync(
        config.manifest.output,
        JSON.stringify(result, null, 4)
    );

    if (!lodash.isEmpty(result)) {
        console.log(`[${colors.green('Manifest created')}] ${colors.magenta('%s')}`, config.manifest.output);
    } else {
        console.log(`[${colors.yellow('Manifest is empty')}] ${colors.magenta('%s')}`, config.manifest.output);
    }

    return new Promise(
        resolve => resolve()
    );
};

const debounceBuild = lodash.debounce(build, 150);

const gulpPipe = () => through.obj(
    function (file, enc, cb) {
        const buildProcess = new Promise(
            resolve => build(resolve)
        );

        buildProcess.then(
            () => cb(null, file)
        );
    }
);

module.exports.gulpPipe = gulpPipe;

module.exports.build = build;

module.exports.debounceBuild = debounceBuild;
