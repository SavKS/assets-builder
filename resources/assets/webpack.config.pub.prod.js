const webpackConfig = require('./webpack.config.base.pub');
const prodMixin = require('./webpack.mixin.prod');

module.exports = prodMixin(webpackConfig);
