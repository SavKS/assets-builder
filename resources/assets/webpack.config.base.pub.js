const webpackConfig = require('./webpack.config.base');
const path = require('path');
const lodash = require('lodash');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const CleanupPlugin = require('./plugins/cleanup');

const manifestReplacer = function (key, value) {
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
    }
};

webpackConfig.output = {
    ...webpackConfig.output,

    path: path.resolve(__dirname, '../../static/pub/js'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
};

webpackConfig.plugins.push(
    new CleanupPlugin({
        otherFolders: [
            path.resolve(__dirname, '../../static/pub/css'),
        ]
    })
);

webpackConfig.plugins.push(
    new ExtractTextPlugin({
        filename: '../../pub/css/app.[hash].css',
        allChunks: true
    })
);

webpackConfig.plugins.push(
    new WebpackAssetsManifest({
        output: '../manifest.json',
        customize: manifestReplacer,
        space: 2,
        writeToDisk: false,
        fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
        sortManifest: true,
        merge: false,
        publicPath: ''
    }),
);

webpackConfig.resolve.alias.vue = path.resolve('./node_modules/vue/dist/vue.runtime.esm.js');

module.exports = webpackConfig;
