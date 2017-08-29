const path = require('path');
const webpack = require('webpack');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const AssestsBuilder = require('./plugins/assets-builder');

module.exports = {
    watch: true,
    entry: [
        './static/src/js/index',
        './static/src/css/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, './static/build/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?importLoaders=1',
                }),
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin,
        new AssestsBuilder({
            staticPath: path.resolve('./static'),
            cssPath: './build/css/app.css',
            browserSync: {

            }
        }),
        new ExtractTextPlugin({
            filename: '../css/app.css',
            allChunks: true,
        }),
    ]
};