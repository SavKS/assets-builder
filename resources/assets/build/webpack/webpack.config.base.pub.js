const webpackConfig = require('./webpack.config.base');

const WebpackAssetsManifest = require('webpack-assets-manifest');

const CleanupPlugin = require('./plugins/cleanup');

const manifestReplacer = require('../utils/manifestReplacer')('pub');

webpackConfig.output = {
    ...webpackConfig.output,

    filename: '[name].[chunkhash:10].js',
    chunkFilename: '[name].[chunkhash:10].js'
};

webpackConfig.plugins.push(
    new CleanupPlugin()
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
    })
);

module.exports = webpackConfig;
