const path = require('path');

const srcPath = path.resolve(__dirname, './src');
const outputPath = path.resolve(__dirname, '../../static');

const fonts = {
    mask: /\/fonts\/.*\.(ttf|woff|woff2|eot|otf|svg)/,
    path: {
        src: path.resolve(srcPath, './fonts'),
        output: path.resolve(outputPath, './fonts')
    }
};

const images = {
    mask: /\/img\/.*\.(png|jpg|jpeg|gif|svg)/,
    path: {
        src: path.resolve(srcPath, './img'),
        output: path.resolve(outputPath, './img')
    },
    manifest: path.resolve(outputPath, './img/manifest.json')
};

const styles = {
    entries: [ '../src/scss/app.scss' ],
    watch: [
        '../src/scss/*.scss',
        '../src/scss/**/*.scss'
    ]
};

const layouts = {
    entries: [ '../src/layouts/*.twig' ],
    path: {
        src: path.resolve(srcPath, './layouts'),
        output: path.resolve(outputPath, './layouts')
    },
    watch: [
        '../src/layouts/*.twig',
        '../src/layouts/**/*.twig'
    ],
    datafile: path.resolve(srcPath, './layouts/datafile.json'),
    baseUri: '../..',
    manifest: path.resolve(outputPath, './layouts/manifest.json')
};

const envPub = {
    basePath: path.resolve(outputPath, './pub'),
    styles: {
        baseUri: 'pub/css',
        path: {
            output: path.resolve(outputPath, './pub/css')
        },
        manifest: path.resolve(outputPath, './pub/css/manifest.json')
    },
    scripts: {
        path: {
            output: path.resolve(outputPath, './pub/js')
        },
        manifest: path.resolve(outputPath, './pub/js/manifest.json')
    }
};

const envSrc = {
    basePath: path.resolve(outputPath, './src'),
    styles: {
        baseUri: 'src/css',
        path: {
            output: path.resolve(outputPath, './src/css')
        }
    },
    scripts: {
        path: {
            output: path.resolve(outputPath, './src/js')
        },
    }
};

const current = () => process.env.BUILD_MODE === 'pub' ? envPub : envSrc;

const browserSync = {
    watch: [
        path.resolve(layouts.path.output, '**'),
        path.resolve(current().scripts.path.output, '**')
    ],
    config: {
        open: true,
        notify: true,
        server: {
            baseDir: outputPath,
            directory: true
        }
    }
};

module.exports = {
    path: {
        src: srcPath,
        output: outputPath
    },
    fonts,
    images,
    styles,
    layouts,
    browserSync,
    env: {
        pub: envPub,
        src: envSrc
    },
    current,
    manifest: {
        output: `${current().basePath}/manifest.json`,
        files: [
            current().styles.manifest,
            current().scripts.manifest,
            layouts.manifest
        ]
    },
    dataServer: {
        path: path.resolve(srcPath, 'server')
    }
};
