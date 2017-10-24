const webpackConfig = require('./webpack.config.base');
const webpack = require('webpack');

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

module.exports = webpackConfig;