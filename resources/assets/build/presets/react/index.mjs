import nodePath from 'node:path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import lodash from 'lodash';
import TerserPlugin from 'terser-webpack-plugin';

export default ({ babelConfig, reactRefreshPath, jsCompiler }) => (webpackConfig, { WEBPACK_SERVE }) => {
    webpackConfig.module.rules.push({
        test: /\.(jsx?|tsx?)$/,
        exclude: [ /node_modules/ ],
        use: [
            jsCompiler === 'swc' ?
                {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            transform: {
                                react: {
                                    development: process.env.NODE_ENV === 'development',
                                    refresh: WEBPACK_SERVE,
                                    runtime: 'automatic'
                                },
                            },
                        },
                    },
                } :
                {
                    loader: 'babel-loader',
                    options: ((babelConfig) => {
                        if (WEBPACK_SERVE) {
                            if (!babelConfig.plugins) {
                                babelConfig.plugins = [];
                            }

                            babelConfig.plugins.push(
                                nodePath.resolve(reactRefreshPath, 'babel')
                            );
                        }

                        return babelConfig;
                    })(babelConfig)
                }
        ]
    });

    if (WEBPACK_SERVE) {
        webpackConfig.plugins.push(
            new ReactRefreshWebpackPlugin({
                overlay: false
            })
        );
    }

    webpackConfig.resolve.extensions.push('.jsx', '.tsx');

    if (!webpackConfig.optimization?.minimizer) {
        lodash.set(webpackConfig, 'optimization.minimizer', []);
    }

    webpackConfig.optimization.minimizer.push(
        new TerserPlugin()
    );

    return webpackConfig;
}
