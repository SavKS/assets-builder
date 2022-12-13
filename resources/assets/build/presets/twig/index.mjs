import WebpackHtmlBuilder from 'webpack-html-builder';
import IgnoreEmitPlugin from 'ignore-emit-webpack-plugin';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';

export default ({
    srcPath,
    publicPath,
    twingEnvFile,
    writeToDisk = true
}) => webpackConfig => {
    const baseTwingEnvFile = nodePath.resolve(
        nodePath.dirname(
            fileURLToPath(import.meta.url)
        ),
        'twing.env.mjs'
    );

    webpackConfig.module.rules.push({
        test: /\.twig$/i,
        loader: 'twing-render-loader',
        options: {
            environmentModule: twingEnvFile ?? baseTwingEnvFile
        }
    });

    webpackConfig.plugins.push(
        new WebpackHtmlBuilder({
            publicPath,
            context: srcPath,
            pathMapper: {
                inputSuffix: '.twig'
            },
            forceAll: true
        })
    );

    if (!writeToDisk) {
        webpackConfig.plugins.push(
            new IgnoreEmitPlugin(/^layouts/)
        );
    }

    return webpackConfig;
};
