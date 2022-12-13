import lodash from 'lodash';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';

import dynamicEntries from '@assets-builder/dynamic-entries-preset';
import imageOptimizer from '@assets-builder/image-optimizer-preset';
import stylesPreset from '@assets-builder/styles-preset';
import svgForJsPreset from '@assets-builder/svg-for-js-preset';
import twig from '@assets-builder/twig-preset';
import envPub from './config@pub.mjs';
import envSrc from './config@src.mjs';
import postcssConfig from './postcss.config.mjs';

const assetsPath = nodePath.resolve(
    nodePath.dirname(
        fileURLToPath(import.meta.url)
    ),
    './'
);

const rootPath = nodePath.resolve(assetsPath, '../../');
const staticPath = nodePath.resolve(rootPath, './static');
const outputPath = nodePath.resolve(staticPath, './build');

const layouts = {
    srcPath: nodePath.resolve(assetsPath, 'layouts'),
    publicPath: 'layouts',
    dataFilesPath: nodePath.resolve(assetsPath, 'layouts/_data')
};

const buildEnv = process.env.BUILD_ENV;

const config = {
    buildEnv,
    paths: {
        root: rootPath,
        assets: assetsPath,
        output: outputPath,
        static: staticPath
    },
    layouts,
    devServer: {
        statusFile: nodePath.resolve(outputPath, 'hot/hot.json')
    }
};

config.env = {
    pub: envPub(config),
    src: envSrc(config)
};

config.current = (buildEnv = process.env.BUILD_ENV) => {
    if (buildEnv === 'pub') {
        return envPub(config);
    }

    return envSrc(config);
};

config.presets = [
    svgForJsPreset,
    // TODO: Select preset
    // reactPreset({
    //     babelConfig,
    //     reactRefreshPath: nodePath.resolve(assetsPath, 'node_modules/react-refresh'),
    //     jsCompiler: 'swc' // babel or swc
    // }),
    // vanillaJs({
    //     babelConfig,
    //     jsCompiler: 'swc' // babel or swc
    // }),
    stylesPreset(postcssConfig, {
        assetsPath,
        enableTailwindRuntimeJit: true,
        appendHashToFiles: config.current().appendHashToFiles
    }),
    twig({
        srcPath: layouts.srcPath,
        publicPath: layouts.publicPath,
        writeToDisk: buildEnv === 'src',
        twingEnvFile: nodePath.resolve(assetsPath, 'twing.env.mjs')
    }),

    ...(buildEnv ? [ imageOptimizer ] : []),

    dynamicEntries({
        jsRootEntry: nodePath.resolve(assetsPath, `js@${ buildEnv }/index.ts`),
        tailwindRuntimeJit: {
            enable: true,
            configFilePath: nodePath.resolve(assetsPath, 'tailwind.config.js')
        },
        modules: {
            path: nodePath.resolve(assetsPath, `js@${ buildEnv }/modules`),
            entriesPattern: 'entry.+(js|jsx|ts|tsx)'
        },
        cssEntries: [
            nodePath.resolve(assetsPath, 'scss/*.scss'),
            `!${ nodePath.resolve(assetsPath, 'scss/_*.scss') }`
        ]
    }),

    webpackConfig => {
        lodash.set(webpackConfig, 'optimization.splitChunks', {
            chunks: 'async',
            cacheGroups: {
                svg: {
                    test: /\.svg/,
                    priority: -5,
                    reuseExistingChunk: true,
                    name: 'svg',
                    minSize: 0
                },

                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        }
        );

        return webpackConfig;
    }
];

export default config;
