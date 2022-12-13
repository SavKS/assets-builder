import nodePath from 'node:path';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';
import WebpackHotLock from 'webpack-hot-lock-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import CopyPlugin from 'copy-webpack-plugin';

import config from '../../config.mjs';

export default (env, argv) => {
    const mode = argv.mode;
    const { WEBPACK_SERVE, WITH_SOURCE_MAPS } = env;

    const appendHashToFiles = !WEBPACK_SERVE && config.current().appendHashToFiles;

    let webpackConfig = {
        context: config.paths.assets,
        output: {
            path: config.current().paths.output,
            clean: true,

            filename: `js/[name]${ appendHashToFiles ? '.[chunkhash:10]' : '' }.js`,
            chunkFilename: `js/[name]${ appendHashToFiles ? '.[chunkhash:10]' : '' }.js`
        },
        module: {
            rules: [
                {
                    test: /\.(svg|jpe?g|png|gif|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: `[path][name]${ appendHashToFiles ? '.[hash:10]' : '' }[ext]`
                    }
                },
                {
                    test: /\.(woff2?|ttf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: `[path][name]${ appendHashToFiles ? '.[hash:10]' : '' }[ext]`
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new WebpackNotifierPlugin({
                alwaysNotify: true
            }),
            new webpack.DefinePlugin({
                APP_ENV: JSON.stringify(process.env.NODE_ENV),
                APP_DEBUG: JSON.stringify(process.env.NODE_ENV === 'development')
            }),

            new WebpackAssetsManifest({
                output: WEBPACK_SERVE ? 'manifest.json' : config.current().manifest,
                contextRelativeKeys: true,
                transform: ({ entrypoints, ...assets }) => ({ mode, entrypoints, assets }),
                writeToDisk: false,
                entrypoints: true,
                publicPath: ''
            }),

            ...(
                WEBPACK_SERVE ? [
                    new WebpackHotLock({
                        name: config.devServer.statusFile,
                        gitignore: true
                    })
                ] : []
            ),

            ...[
                ...(config.copy ?? []),
                ...(config.current().copy ?? [])
            ].map(
                asset => new CopyPlugin(asset)
            ),

            new webpack.DefinePlugin({
                process: JSON.stringify({
                    env: {
                        SERVE_MODE: process.env.SERVE_MODE,
                        WEBPACK_WATCH: process.env.WEBPACK_WATCH,
                        BUILD_MODE: process.env.BUILD_MODE,
                        NODE_ENV: process.env.NODE_ENV
                    }
                })
            }),
        ],
        resolve: {
            extensions: [ '.js', '.ts', '.json' ],
            alias: {
                '@assets': config.paths.assets,
                '@img': nodePath.resolve(config.paths.assets, 'img'),
                '@svg': nodePath.resolve(config.paths.assets, 'img/svg'),
                '@': config.current().paths.scripts
            },
            fallback: {
                'stream': nodePath.resolve(config.paths.assets, './node_modules/stream-browserify'),
                'buffer': nodePath.resolve(config.paths.assets, './node_modules/buffer')
            }
        },
        devServer: {
            allowedHosts: 'all',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        },
        performance: {
            hints: mode === 'development' ? false : 'warning'
        },
        devtool: {
            development: 'inline-source-map',
            production: WITH_SOURCE_MAPS ? 'source-map' : false
        }[ mode ]
    };

    [
        ...(config.presets ?? []),
        ...(config.current().presets ?? [])
    ].forEach(preset => {
        webpackConfig = preset(webpackConfig, env, mode);
    });

    return webpackConfig;
};
