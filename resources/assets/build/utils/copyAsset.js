const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const mkdirp = require('mkdirp');
const md5File = require('md5-file');

module.exports = (
    filePath,
    basePath,
    srcPath,
    outputPath,
    originUrl,
    withoutHash = false
) => {
    if (!fs.existsSync(filePath)) {
        console.log(`[${colors.red('%s')}] ${colors.magenta('%s')}`, 'File not exists', filePath);

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
        fs.copyFileSync(filePath, outputFilePath);

        return path.relative(basePath, outputFilePath);
    } else {
        const hash = md5File.sync(filePath).substr(0, 10);

        const hashedOutputFilePath = outputFilePath.replace(
            srcPathInfo.name,
            `${srcPathInfo.name}.${hash}`
        );

        const outputRelativeFilePath = path.relative(
            basePath,
            outputFilePath
        );

        fs.copyFileSync(filePath, hashedOutputFilePath);

        const hashedUri = outputRelativeFilePath.replace(
            srcPathInfo.name,
            `${srcPathInfo.name}.${hash}`
        );

        return hashedUri;
    }
};
