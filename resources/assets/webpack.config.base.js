const path = require('path');
const webpack = require('webpack');
const lodash = require('lodash');
const glob = require('glob');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');

const utils = require('./utils');
const externals = require('./externals');

module.exports = {
    entry: {
        app: lodash.concat(
            './src/js/index.js',
            glob.sync('./src/js/modules/*/*.js')
        )
    },
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:16].[ext]',
                        outputPath: '../../img',
                        publicPath: '../../img'
                    }
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:16].[ext]',
                        outputPath: '../../fonts',
                        publicPath: '../../fonts'
                    }
                }
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:16].[ext]',
                        outputPath: '../../',
                        publicPath: '../../'
                    }
                }
            }
        ].concat(
            utils.styleLoaders({
                sourceMap: process.env.NODE_ENV === 'develop',
                extract: true,
                usePostCSS: true
            })
        )
    },
    externals,
    plugins: [
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => {
                return module.resource
                    && !/\.(png|jpe?g|gif)$/.test(module.resource)
                    && /\.(js|svg)$/.test(module.resource);
            }
        }),
        new DynamicPublicPathPlugin({
            externalGlobal: 'window.App.cdn',
            chunkName: 'vendor'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@base': path.resolve(__dirname, '../../'),
            '@root': path.resolve(__dirname, './src/js'),
            '@store': path.resolve(__dirname, './src/js/store'),
            '@plugins': path.resolve(__dirname, './src/js/plugins'),
            '@components': path.resolve(__dirname, './src/js/components'),
            '@constants': path.resolve(__dirname, './src/js/constants'),
            '@routes': path.resolve(__dirname, './src/js/routes'),
            '@helpers': path.resolve(__dirname, './src/js/helpers'),
            '@modules': path.resolve(__dirname, './src/js/modules'),
            '@mixins': path.resolve(__dirname, './src/js/mixins'),
            '@vendor': path.resolve(__dirname, './src/js/vendor'),
            '@svg': path.resolve(__dirname, '../../static/src/svg')
        }
    }
};
