const path = require('path');
const webpack = require('webpack');
const lodash = require('lodash');
const glob = require('glob');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');

const jsModules = lodash.reduce(glob.sync('./src/js/modules/**/*.js'), (state, file) => {
    const parts = file.split('/');

    state[parts[parts.length - 2].replace('.js', '')] = file;

    return state;
}, {});

let config = {
    entry: lodash.assign({
        'index': './src/js/index',
        'app': './src/scss/app.scss'
    }, jsModules),
    output: {
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
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === 'develop' ? 'inline' : false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV === 'develop' ? 'inline' : false
                            }
                        }
                    ]
                })
            }
        ]
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
