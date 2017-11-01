const path = require('path');
const webpack = require('webpack');
const lodash = require('lodash');
const glob = require('glob');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanupPlugin = require('./plugins/cleanup');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');
const argv = require('optimist').argv;

const AssestsBuilder = require('./plugins/assets-builder');

const vueModules = lodash.reduce(glob.sync('./src/js/modules/**/*.js'), (state, file) => {
    const parts = file.split('/');

    state[parts[parts.length - 2].replace('.js', '')] = file;

    return state;
}, {});

const manifestReplacer = function (key, value) {
    let finalKey = key;
    let finalValue = value;

    if (/\.js$/.test(key)) {
        finalKey = 'build/js/' + lodash.trimStart(key, '/');
        finalValue = 'build/js/' + lodash.trimStart(value, '/');
    } else if (/\.css/.test(key)) {
        finalKey = 'build/css/' + lodash.trimStart(key, '/');
        finalValue = value.replace('../../', '');
    }

    return {
        key: finalKey,
        value: finalValue
    }
};

let config = {
    entry: lodash.assign({
        'index': './src/js/index',
        'app': './src/scss/app.scss'
    }, vueModules),
    output: {
        path: path.resolve(__dirname, '../../static/build/js'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loaders: ['vue-loader']
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.svg$/,
                loader: 'svg-loader'
            },
            {
                test: /\.blade.php$/,
                loader: 'svg-loader'
            },
            {
                test: /\.png$/,
                loaders: ['file-loader?name=i/[hash].[ext]']
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'postcss-loader?importLoaders=1'
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract(['postcss-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new CleanupPlugin({
            otherFolders: [
                path.resolve(__dirname, '../../static/build/css')
            ]
        }),
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin,
        new AssestsBuilder({
            staticPath: path.resolve('../../static'),
            cssPath: './build/css',
            manifest: './build/manifest.json',
            disableBrowserSync: argv.watch !== true
        }),
        new ExtractTextPlugin({
            filename: '../../build/css/app.[hash].css',
            allChunks: true
        }),
        new ExtractTextPlugin({
            filename: '../../src/css/app.css',
            allChunks: true
        }),
        new WebpackAssetsManifest({
            output: '../manifest.json',
            customize: manifestReplacer,
            space: 2,
            writeToDisk: false,
            fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
            sortManifest: true,
            merge: false,
            publicPath: ''
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => {
                return module.resource
                    && /\.(js|css|es6|blade.php)$/.test(module.resource);
            }
        }),
        new DynamicPublicPathPlugin({
            externalGlobal: 'window.Laravel.cdn',
            chunkName: 'manifest'
        })
    ],
    resolve: {
        alias: {
            '@root': path.resolve('src'),
            '@components': path.resolve('src/components'),
            '@constants': path.resolve('src/constants'),
            '@helpers': path.resolve('src/helpers'),
            '@modules': path.resolve('src/modules')
        }
    }
};

module.exports = config;
