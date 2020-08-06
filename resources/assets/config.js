const path = require('path');

const srcPath = path.resolve(__dirname, './');
const outputPath = path.resolve(__dirname, '../../static/build');

const fonts = {
    mask: /[\/|\\]fonts[\/|\\].*\.(ttf|woff|woff2|eot|otf|svg)/,
    path: {
        src: path.resolve(srcPath, './fonts'),
        output: path.resolve(outputPath, './fonts')
    }
};

const images = {
    mask: /[\/|\\]img[\/|\\].*\.(png|jpg|jpeg|gif|svg)/,
    path: {
        src: path.resolve(srcPath, './img'),
        output: path.resolve(outputPath, './img')
    },
    manifest: path.resolve(outputPath, './img/manifest.json')
};

const styles = {
    entries: [ '../scss/app.scss' ],
    watch: [
        '../scss/*.scss',
        '../scss/**/*.scss'
    ]
};

const layouts = {
    entries: [ '../layouts/*.twig' ],
    path: {
        src: path.resolve(srcPath, './layouts'),
        output: path.resolve(outputPath, './layouts')
    },
    watch: [
        '../layouts/*.twig',
        '../layouts/**/*.twig'
    ],
    datafile: path.resolve(srcPath, './layouts/datafile.json'),
    serverFiles: path.resolve(srcPath, './server/*.json'),
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
    },
    staticFiles: {
        basePath: path.resolve(outputPath, './pub/vendor'),
        manifest: path.resolve(outputPath, './pub/vendor/manifest-static.json')
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
        }
    },
    staticFiles: {
        basePath: path.resolve(outputPath, './src/vendor'),
        manifest: path.resolve(outputPath, './src/vendor/manifest-static.json')
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
            baseDir: path.resolve(outputPath, '../'),
            directory: true
        }
    },
    ghostMode: false
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
            current().staticFiles.manifest,
            layouts.manifest
        ]
    },
    dataServer: {
        path: path.resolve(srcPath, 'server')
    }
};
