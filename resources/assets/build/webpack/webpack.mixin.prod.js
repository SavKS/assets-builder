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

    return webpackConfig;
};
