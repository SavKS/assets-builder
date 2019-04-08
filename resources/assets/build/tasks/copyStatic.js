const fs = require('fs');
const path = require('path');
const md5File = require('md5-file');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const lodash = require('lodash');
const colors = require('colors/safe');
const config = require('../../config');
const staticFiles = require('../../static');

const mode = process.env.BUILD_MODE;
const env = process.env.NODE_ENV;

const hashRegExp = /\.\[hash\:(\d+)\]\./;

const copyFile = (manifest, data, moduleName) => {
    const entry = lodash.isString(data.entry) ?
        data.entry :
        lodash.get(data, `entry.${env}`);
    const name = lodash.isString(data.name) ?
        data.name :
        lodash.get(data, `name.${mode}`);

    if (!entry || !name) {
        console.log(`[${colors.red('Static error')}] Invalid module config [${colors.magenta('%s')}]`, moduleName);
    }

    if (!fs.existsSync(entry)) {
        console.log(`[${colors.red('Static error')}] File not found [${colors.magenta('%s')}]`, entry);
    }

    let resultFileName = name;
    let outputPath;

    if (data.outputFolder) {
        outputPath = `${config.path.output}/${mode}/vendor/${data.outputFolder}`;
    } else {
        switch (data.type) {
            case 'js':
                outputPath = `${config.path.output}/${mode}/vendor/js`;
                break;

            case 'css':
                outputPath = `${config.path.output}/${mode}/vendor/css`;
                break;

            case 'image':
                outputPath = `${config.path.output}/vendor/img`;
                break;

            default:
                outputPath = config.path.output;
        }
    }

    if (!fs.existsSync(outputPath)) {
        mkdirp.sync(outputPath);
    }

    let cleanFilename = name;

    if (hashRegExp.test(name)) {
        const [ hashPlaceholder, length ] = name.match(hashRegExp);

        const fileHash = md5File.sync(entry).substr(0, length);

        resultFileName = name.replace(hashPlaceholder, `.${fileHash}.`);
        cleanFilename = name.replace(hashPlaceholder, '.');
    }

    fs.copyFileSync(
        entry,
        `${outputPath}/${resultFileName}`
    );

    const relativeOutputPath = path.relative(config.path.output, outputPath);

    manifest[ `${relativeOutputPath}/${cleanFilename}` ] = `${relativeOutputPath}/${resultFileName}`;
};

module.exports = () => () => {
    const manifest = {};

    rimraf.sync(`${config.path.output}/${mode}/vendor`);
    rimraf.sync(`${config.path.output}/vendor`);

    lodash.each(
        staticFiles,
        (...args) => copyFile(manifest, ...args)
    );

    fs.writeFileSync(
        config.current().staticFiles.manifest,
        JSON.stringify(manifest, null, 4)
    );

    return new Promise(resolve => {
        resolve();
    });
};
