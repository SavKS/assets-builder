const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const md5File = require('md5-file');

module.exports = (filePath, srcPath, staticPath, baseUri, originUrl = 'none') => {
    if (!fs.existsSync(filePath)) {
        console.log('[\x1b[31m%s\x1b[0m] %s', 'File not exists', filePath);

        return originUrl;
    }

    const hash = md5File.sync(filePath);
    const relativeFilePath = path.relative(srcPath, filePath);
    const output = path.resolve(staticPath, relativeFilePath);

    const sourcePathInfo = path.parse(filePath);
    const outputPathInfo = path.parse(output);

    if (!fs.existsSync(outputPathInfo.dir)) {
        mkdirp.sync(outputPathInfo.dir);
    }

    const hashedOutputFilePath = output.replace(
        sourcePathInfo.name,
        `${sourcePathInfo.name}.${hash}`
    );

    fs.copyFileSync(filePath, hashedOutputFilePath);

    const hashedRelativeFilePath = relativeFilePath.replace(
        sourcePathInfo.name,
        `${sourcePathInfo.name}.${hash}`
    );

    return `${baseUri}/${hashedRelativeFilePath}`;
};
