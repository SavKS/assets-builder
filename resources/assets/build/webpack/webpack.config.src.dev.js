const webpackConfig = require('./webpack.config.base.src');
const devMixin = require('./webpack.mixin.dev');

module.exports = devMixin(webpackConfig);
