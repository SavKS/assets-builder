const path = require('path');

const rootPath = path.resolve(__dirname, '../../');
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
    entries: [ '../scss/*.scss', '!../scss/_*.scss' ],
    watch: [
        '../scss/*.scss',
        '../scss/**/*.scss'
    ]
};

const layouts = {
    runtimeBuild: true,
    entries: [ '../layouts/*.twig' ],
    path: {
        src: path.resolve(srcPath, './layouts'),
        output: path.resolve(outputPath, './layouts')
    },
    watch: [
        '../layouts/*.twig',
        '../layouts/**/*.twig'
    ],
    dataDir: path.resolve(srcPath, './layouts/_data'),
    baseUri: '../..',
    manifest: path.resolve(outputPath, './layouts/manifest.json'),
    assetFiles: {
        manifest: path.resolve(outputPath, './pub/manifest-assets.json')
    }
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
    },
    assetFiles: {
        manifest: path.resolve(outputPath, './pub/manifest-assets.json')
    }
};

const envSrc = {
    basePath: path.resolve(outputPath, './src'),
    styles: {
        baseUri: 'src/css',
        path: {
            output: path.resolve(outputPath, './src/css')
        },
        manifest: path.resolve(outputPath, './src/css/manifest.json')
    },
    scripts: {
        path: {
            output: path.resolve(outputPath, './src/js')
        },
        manifest: path.resolve(outputPath, './src/js/manifest.json')
    },
    staticFiles: {
        basePath: path.resolve(outputPath, './src/vendor'),
        manifest: path.resolve(outputPath, './src/vendor/manifest-static.json')
    },
    assetFiles: {
        manifest: path.resolve(outputPath, './src/manifest-assets.json')
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
        notify: false,
        server: {
            baseDir: path.resolve(outputPath, '../'),
            directory: true
        },
        ghostMode: false
    }
};

const critical = {
    path: {
        src: layouts.path.output + '/*.html',
        output: layouts.path.output,
        blade: path.resolve(__dirname, '../../resources/views/parts/critical/')
    },
    urlFunction: 'asset',
    settings: {
        inline: false,
        base: outputPath,
        penthouse: {
            timeout: 180000
        },
        dimensions: [{
            height: 1000,
            width: 414
        }, {
            height: 1300,
            width: 1440
        }, {
            height: 1500,
            width: 1920
        }],
        ignore: {
            atrule: ['@font-face'],
            decl: (node, value) => /url\(/.test(value)
        }
    }
};

module.exports = {
    buildMode: process.env.BUILD_MODE,
    path: {
        root: rootPath,
        src: srcPath,
        output: outputPath
    },
    fonts,
    images,
    styles,
    layouts,
    browserSync,
    critical,
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
            current().assetFiles.manifest,
            layouts.manifest
        ]
    },
    mockServer: {
        port: 3030,
        routesPath: path.resolve(srcPath, 'server/routes.js'),
        dbDir: path.resolve(srcPath, 'server/db')
    }
};
