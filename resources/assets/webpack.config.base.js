const path = require('path');
const webpack = require('webpack');
const lodash = require('lodash');
const glob = require('glob');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');
const ImportOnce = require('node-sass-import-once');

const jsModules = lodash.reduce(glob.sync('./src/js/modules/**/*.js'), (state, file) => {
    const parts = file.split('/');

    state[ parts[ parts.length - 2 ].replace('.js', '') ] = file;

    return state;
}, {});

module.exports = {
    entry: lodash.assign({
        'index': './src/js/index',
        'app': './src/scss/app.scss'
    }, jsModules),
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
                test: /\.svg$/,
                loader: 'svg-loader'
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'postcss-loader?importLoaders=1',
                            options: {
                                sourceMap: process.env.NODE_ENV === 'develop' ? 'inline' : false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === 'develop' ? 'inline' : false,
                                importer: ImportOnce,
                                importOnce: {
                                    index: false,
                                    css: false,
                                    bower: false
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    externals: {
        'jquery': 'jQuery',
        '$': 'jQuery',
        'perfect-scrollbar': 'PerfectScrollbar'
    },
    plugins: [
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => {
                return module.resource
                    && /\.(js|css|es6|svg)$/.test(module.resource);
            }
        }),
        new DynamicPublicPathPlugin({
            externalGlobal: 'window.App.cdn',
            chunkName: 'manifest'
        })
    ],
    resolve: {
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
