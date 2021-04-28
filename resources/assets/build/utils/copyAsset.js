const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const mkdirp = require('mkdirp');
const md5 = require('md5');
const lodash = require('lodash');

const config = require('../../config');

const manifestReplacer = require('../utils/manifestReplacer')(config.buildMode);

const manifest = {};

const saveManifest = lodash.debounce(function (manifest) {
    fs.writeFileSync(
        config.current().assetFiles.manifest,
        JSON.stringify(manifest, null, 4)
    );
}, 300);

const pushToManifest = (key, value) => {
    const { key: manifestKey, value: manifestValue } = manifestReplacer({ key, value });

    manifest[ manifestKey ] = manifestValue;

    saveManifest(manifest);
};

const preparePath = filePath => lodash.trimStart(filePath.replace(/\.+\//g, ''), '/');

module.exports = (
    filePath,
    basePath,
    srcPath,
    outputPath,
    originUrl,
    withoutHash = false
) => {
    if (!fs.existsSync(filePath)) {
        console.log(`[${ colors.red('%s') }] ${ colors.magenta('%s') }`, 'File not exists', filePath);

        return originUrl;
    }

    const relativeFilePath = path.relative(srcPath, filePath);
    const outputFilePath = path.resolve(outputPath, relativeFilePath);

    const srcPathInfo = path.parse(filePath);
    const outputPathInfo = path.parse(outputFilePath);

    if (!fs.existsSync(outputPathInfo.dir)) {
        mkdirp.sync(outputPathInfo.dir);
    }

    if (withoutHash) {
        if (!fs.existsSync(outputFilePath)) {
            fs.copyFileSync(filePath, outputFilePath);
        }

        const outputFileRelativePath = path.relative(basePath, outputFilePath);

        pushToManifest(outputFileRelativePath, outputFileRelativePath);

        return path.relative(basePath, outputFilePath);
    } else {
        const relativePath = path.relative(config.path.src, filePath);
        const hash = md5(`${ relativePath }.${ fs.statSync(filePath).size }`).substr(0, 10);

        const hashedOutputFilePath = outputFilePath.replace(
            `${ srcPathInfo.name }${ srcPathInfo.ext }`,
            `${ srcPathInfo.name }.${ hash }${ srcPathInfo.ext }`
        );

        const outputRelativeFilePath = path.relative(
            basePath,
            outputFilePath
        );

        if (!fs.existsSync(hashedOutputFilePath)) {
            fs.copyFileSync(filePath, hashedOutputFilePath);
        }

        const hashedUri = outputRelativeFilePath.replace(
            `${ srcPathInfo.name }${ srcPathInfo.ext }`,
            `${ srcPathInfo.name }.${ hash }${ srcPathInfo.ext }`
        );

        const outputFileRelativePath = path.relative(basePath, outputFilePath);
        const outputFileRelativeHashedPath = hashedUri.replace(new RegExp('\\\\', 'g'), '/');

        pushToManifest(
            preparePath(outputFileRelativePath),
            preparePath(outputFileRelativeHashedPath)
        );

        return outputFileRelativeHashedPath;
    }
};
