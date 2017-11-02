let plugins = [
    require('autoprefixer')({
        browsers: ['last 2 versions']
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        require('cssnano')
    );
}

module.exports = {
    plugins
};