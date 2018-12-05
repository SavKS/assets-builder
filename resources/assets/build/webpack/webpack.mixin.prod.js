const webpack = require('webpack');

module.exports = (webpackConfig) => {
    webpackConfig.mode = 'production';

    webpackConfig.performance = {
        hints: 'warning'
    };

    webpackConfig.devtool = false;

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                BUILD_MODE: `"${process.env.BUILD_MODE}"`
            }
        })
    );

    webpackConfig.optimization = {
        minimize: true
    };

    return webpackConfig;
};
