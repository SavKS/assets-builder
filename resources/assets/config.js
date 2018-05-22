const path = require('path');

const srcPath = path.resolve(__dirname, './src');
const staticPath = path.resolve(__dirname, '../../static');

const fonts = {
    mask: /\/fonts\/.*\.(ttf|woff|woff2|eot)/,
    source: path.resolve(srcPath, './fonts'),
    baseUri: '../..'
};

const images = {
    mask: /\/img\/.*\.(png|jpg|gif|svg)/,
    path: {
        src: path.resolve(srcPath, './img'),
        output: path.resolve(staticPath, './img')
    },
    baseUri: '../..'
};

const styles = {
    entries: [ '../src/scss/app.scss' ],
        watch: [
        '../src/scss/*.scss',
        '../src/scss/**/*.scss'
    ]
};

const browserSync = {
    open: true,
    server: {
        baseDir: staticPath,
        directory: true
    }
};

const envPub = {
    basePath: path.resolve(staticPath, './pub'),
    styles: {
        baseUri: 'pub/css',
        output: path.resolve(staticPath, './pub/css')
    }
};

const envSrc = {
    basePath: path.resolve(staticPath, './src'),
    styles: {
        baseUri: 'src/css',
        output: path.resolve(staticPath, './src/css')
    }
};

module.exports = {
    srcPath,
    staticPath,
    fonts,
    images,
    styles,
    browserSync,
    env: {
        pub: envPub,
        src: envSrc
    },
    current: () => process.env.BUILD_MODE === 'pub' ?
        envPub :
        envSrc
};
