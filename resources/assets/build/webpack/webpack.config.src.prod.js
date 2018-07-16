const webpackConfig = require('./webpack.config.base.src');
const devMixin = require('./webpack.mixin.prod');

module.exports = devMixin(webpackConfig);
