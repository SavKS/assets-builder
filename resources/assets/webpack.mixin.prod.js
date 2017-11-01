const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (webpackConfig) => {
    webpackConfig.performance = {
        hints: 'warning'
    };

    webpackConfig.devtool = false;

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );

    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        })
    );

    webpackConfig.plugins.push(
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );

    return webpackConfig;
};