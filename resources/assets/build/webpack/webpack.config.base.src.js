const webpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path');

const CleanupPlugin = require('./plugins/cleanup');

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
    new CleanupPlugin
);

module.exports = webpackConfig;
