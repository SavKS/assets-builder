const webpackConfig = require('./webpack.config.base');
const webpack = require('webpack');

const WebpackAssetsManifest = require('webpack-assets-manifest');

const CleanupPlugin = require('./plugins/cleanup');

const manifestReplacer = require('../utils/manifestReplacer')('src');

webpackConfig.output = {
    ...webpackConfig.output,

    filename: '[name].js',
    chunkFilename: '[name].js'
};

webpackConfig.performance = {
    hints: false
};

webpackConfig.devtool = 'eval';

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"develop"',
            BUILD_MODE: `"${process.env.BUILD_MODE}"`
        }
    })
);

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
