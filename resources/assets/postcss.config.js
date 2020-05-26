const config = require('./config');
const copyAsset = require('./build/utils/copyAsset');

let plugins = [
    require('autoprefixer')({
        grid: 'no-autoplace'
    }),
    require('postcss-url')([
        {
            filter: config.fonts.mask,
            url: asset => copyAsset(
                asset.absolutePath,
                config.current().styles.path.output,
                config.fonts.path.src,
                config.fonts.path.output,
                asset.originUrl
            )
        },
        {
            filter: config.images.mask,
            url: asset => copyAsset(
                asset.absolutePath,
                config.current().styles.path.output,
                config.images.path.src,
                config.images.path.output,
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
