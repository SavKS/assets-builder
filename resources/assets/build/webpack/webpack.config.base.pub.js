const webpackConfig = require('./webpack.config.base');
const lodash = require('lodash');

const WebpackAssetsManifest = require('webpack-assets-manifest');

const CleanupPlugin = require('./plugins/cleanup');

const manifestReplacer = ({ key, value }) => {
    let finalKey = key;
    let finalValue = value;

    if (/\.js$/.test(key)) {
        finalKey = 'pub/js/' + lodash.trimStart(key, '/');
        finalValue = 'pub/js/' + lodash.trimStart(value, '/');
    } else if (/\.css/.test(key)) {
        finalKey = 'pub/css/' + lodash.trimStart(key, '/');
        finalValue = value.replace('../../', '');
    }

    return {
        key: finalKey,
        value: finalValue
    };
};

webpackConfig.output = {
    ...webpackConfig.output,

    filename: '[name].[chunkhash:10].js',
    chunkFilename: '[name].[chunkhash:10].js'
};

webpackConfig.plugins.push(
    new CleanupPlugin
);

webpackConfig.plugins.push(
    new WebpackAssetsManifest({
        output: './manifest.json',
        customize: manifestReplacer,
        space: 2,
        writeToDisk: false,
        fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
        sortManifest: true,
        merge: false,
        publicPath: ''
    }),
);

module.exports = webpackConfig;
