const webpack = require('webpack');

module.exports = (webpackConfig) => {
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

    return webpackConfig;
};