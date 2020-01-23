const path = require('path');
const webpack = require('webpack');
const lodash = require('lodash');
const glob = require('glob');

const FriendlyErrors = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const DynamicPublicPathPlugin = require('dynamic-public-path-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const externals = require('../../externals');
const config = require('../../config');

const webpackConfig = {
    entry: {
        app: lodash.concat(
            "../js/index.js",
            glob.sync("./js/modules/*/index.js")
        )
    },
    output: {
        path: config.current().scripts.path.output,
        publicPath: 'PUBLIC_PATH'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: [
                            {
                                loader: 'babel-loader',
                                options: require('../../babel.config')
                            }
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [ /node_modules/ ],
                options: require('../../babel.config')
            },
            {
                test: /\.svg$/,
                loader: 'svg-loader'
            },
            {
                test: /\.tpl$/,
                use: [ 'html-es6-template-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: `/build/${process.env.BUILD_MODE}/vendor`,
                    outputPath: `${path.relative(__dirname, config.current().staticFiles.basePath)}/img`,
                    name: '[name].[hash:10].[ext]'
                }
            }
        ]
    },
    externals,
    plugins: [
        new ProgressPlugin,
        new FriendlyErrors,
        new WebpackNotifierPlugin({
            alwaysNotify: true
        }),
        new DynamicPublicPathPlugin({
            externalGlobal: 'window.App.cdn',
            chunkName: 'app'
        }),
        new VueLoaderPlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.vue'
        ],
        modules: [ 'node_modules' ],
        alias: {
            "@base": path.resolve(__dirname, "../../../../"),
            "@src": path.resolve(__dirname, "../.."),
            "@store": path.resolve(__dirname, "../../js/store"),
            "@plugins": path.resolve(__dirname, "../../js/plugins"),
            "@components": path.resolve(__dirname, "../../js/components"),
            "@constants": path.resolve(__dirname, "../../js/constants"),
            "@routes": path.resolve(__dirname, "../../js/routes"),
            "@helpers": path.resolve(__dirname, "../../js/helpers"),
            "@modules": path.resolve(__dirname, "../../js/modules"),
            "@mixins": path.resolve(__dirname, "../../js/mixins"),
            "@vendor": path.resolve(__dirname, "../../js/vendor"),
            "@svg": path.resolve(__dirname, "../../static/src/svg")
        }
    }
};

if (process.env.INSPECT_JS) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin
    );
}

module.exports = webpackConfig;
