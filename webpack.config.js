const path = require('path');
const webpack = require('webpack');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const AssestsBuilder = require('./plugins/assets-builder');

module.exports = {
    entry: './static/src/js/index',
    output: {
        path: path.resolve(__dirname, './static/build/js'),
        filename: '[name].js'
    },
    module: {
        loaders: []
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin,
        new AssestsBuilder({
            staticPath: path.resolve('./static'),
            templater: {
                source: './layouts/_includes',
                output: './layouts/render',
                data: {
                    test: 'Hello world'
                }
            },
            browserSync: {

            }
        })
    ]
};