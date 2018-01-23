const webpackConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('optimist').argv;

const AssestsBuilder = require('./plugins/assets-builder');

const CleanupPlugin = require('./plugins/cleanup');

webpackConfig.output = {
    ...webpackConfig.output,

    path: path.resolve(__dirname, '../../static/src/js'),
    filename: '[name].js',
    chunkFilename: '[name].js',
};

webpackConfig.performance = {
    hints: false
};

webpackConfig.devtool = 'eval';

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"develop"'
        }
    })
);

webpackConfig.plugins.push(
    new CleanupPlugin({
        otherFolders: [
            path.resolve(__dirname, '../../static/src/css'),
        ]
    })
);

webpackConfig.plugins.push(
    new ExtractTextPlugin({
        filename: '../../src/css/app.css',
        allChunks: true
    })
);

webpackConfig.plugins.push(
    new AssestsBuilder({
        staticPath: path.resolve('../../static'),
        disableBrowserSync: argv.watch !== true
    }),
);

webpackConfig.resolve.alias.vue = path.resolve('./node_modules/vue/dist/vue.js');

module.exports = webpackConfig;