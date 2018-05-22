const config = require('./config');
const copyAsset = require('./build/utils/copyAsset');

let plugins = [
    require('autoprefixer')({
        browsers: [ 'last 2 versions' ]
    }),
    require('postcss-url')([
        {
            filter: config.fonts.mask,
            url: asset => copyAsset(
                asset.absolutePath,
                config.srcPath,
                config.staticPath,
                config.fonts.baseUri,
                asset.originUrl
            )
        },
        {
            filter: config.images.mask,
            url: asset => copyAsset(
                asset.absolutePath,
                config.srcPath,
                config.staticPath,
                config.images.baseUri,
                asset.originUrl
            )
        }
    ])
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        require('cssnano')
    );
}

module.exports = {
    plugins
};
