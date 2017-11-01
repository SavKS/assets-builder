const webpackConfig = require('./webpack.config.base.pub');
const devMixin = require('./webpack.mixin.dev');

module.exports = devMixin(webpackConfig);