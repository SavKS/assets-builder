const webpackConfig = require('./webpack.config.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }),
);

module.exports = webpackConfig;