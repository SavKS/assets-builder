const path = require('path');
const webpack = require('webpack');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');

const utils = require('./utils');

module.exports = {
    entry: {
        app: './src/js/index.js'
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
                test: /\.svg$/,
                loader: 'svg-loader'
            }
        ].concat(
            utils.styleLoaders({
                sourceMap: process.env.NODE_ENV === 'develop',
                extract: true,
                usePostCSS: true
            })
        )
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
                    && /\.(js|svg)$/.test(module.resource);
            }
        }),
        new DynamicPublicPathPlugin({
            externalGlobal: 'window.App.cdn',
            chunkName: 'vendor'
        })
    ],
    resolve: {
        extensions: [ '.js', '.json', '.vue' ],
        alias: {
            '@base': path.resolve(__dirname, '../../'),
            '@root': path.resolve(__dirname, './src/js'),
            '@store': path.resolve(__dirname, './src/js/store'),
            '@utils': path.resolve(__dirname, './src/js/utils'),
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
