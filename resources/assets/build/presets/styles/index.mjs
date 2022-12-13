import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import IgnoreEmitPlugin from 'ignore-emit-webpack-plugin';
import lodash from 'lodash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import sassImporter from 'node-sass-magic-importer';
import sass from 'sass';
import TailwindRuntimeJit from 'tailwind-runtime-jit/webpack';

export default (postcssConfig, {
    assetsPath,
    enableTailwindRuntimeJit,
    appendHashToFiles
}) => (webpackConfig, { WEBPACK_WATCH, WEBPACK_SERVE }) => {
    webpackConfig.module.rules.push({
        test: /\.css$/,
        use: [
            (WEBPACK_WATCH || WEBPACK_SERVE) ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    });

    webpackConfig.module.rules.push({
        test: /\.scss$/,
        use: [
            (WEBPACK_WATCH || WEBPACK_SERVE) ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: postcssConfig
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: sass,
                    sassOptions: {
                        importer: sassImporter({
                            cwd: assetsPath
                        })
                    }
                }
            }
        ]
    });

    if (enableTailwindRuntimeJit
        && (WEBPACK_WATCH || WEBPACK_SERVE)
    ) {
        webpackConfig.plugins.push(
            new TailwindRuntimeJit()
        );
    } else {
        const needAppendHashToFiles = !WEBPACK_SERVE && appendHashToFiles;

        webpackConfig.plugins.push(
            new MiniCssExtractPlugin({
                filename: `[name]${ needAppendHashToFiles ? '.[chunkhash:10]' : '' }.css`,
                chunkFilename: `[id]${ needAppendHashToFiles ? '.[chunkhash:10]' : '' }.css`
            }),

            new IgnoreEmitPlugin(/css\/[^\/]+\.js$/)
        );
    }

    if (!webpackConfig.optimization?.minimizer) {
        lodash.set(webpackConfig, 'optimization.minimizer', []);
    }

    webpackConfig.optimization.minimizer.push(
        new CssMinimizerPlugin()
    );

    return webpackConfig;
};
