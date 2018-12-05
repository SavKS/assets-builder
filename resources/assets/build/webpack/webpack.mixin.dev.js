const webpack = require('webpack');

module.exports = (webpackConfig) => {
    webpackConfig.mode = 'development';

    webpackConfig.performance = {
        hints: false
    };

    webpackConfig.devtool = 'inline-source-map';

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"develop"',
                BUILD_MODE: `"${process.env.BUILD_MODE}"`
            }
        })
    );

    return webpackConfig;
};
