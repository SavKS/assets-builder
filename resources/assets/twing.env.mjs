import { globby } from 'globby';
import lodash from 'lodash';
import fs from 'node:fs';
import nodePath from 'node:path';
import { TwingLoaderChain, TwingLoaderRelativeFilesystem } from 'twing';

import config from './config.mjs';


/** @type {import('twing').TwingEnvironmentOptions} */
export const options = {
    autoescape: false
};

/**
 * @param {import('webpack').LoaderContext<{}>} loader
 * @param {import('twing').TwingEnvironment} env
 */
export async function configure({ loader, env }) {
    loader.addContextDependency(config.layouts.dataFilesPath);

    if (fs.existsSync(`${ config.layouts.dataFilesPath }/_global.json`)) {
        const globalVars = fs.existsSync(`${ config.layouts.dataFilesPath }/_global.json`) ?
            JSON.parse(
                fs.readFileSync(`${ config.layouts.dataFilesPath }/_global.json`, 'utf8')
            ) :
            {};

        Object.entries(globalVars).forEach(([ key, value ]) => {
            env.addGlobal(key, value);
        });

        loader.addDependency(`${ config.layouts.dataFilesPath }/_global.json`);
    }

    const [ scopedVars, scopedPaths ] = await resolveScopedVars(config.layouts.dataFilesPath);

    Object.entries(scopedVars).forEach(([ key, value ]) => {
        env.addGlobal(key, value);
    });

    scopedPaths.forEach(
        scopedPath => loader.addDependency(scopedPath)
    );

    env.addGlobal('runtimeOptions', {
        serve: process.argv.includes('serve'),
        watch: process.env.WEBPACK_WATCH,
        mode: loader.mode
    });

    env.enableDebug();

    env.setLoader(
        new TwingLoaderChain([
            env.getLoader(),
            new TwingLoaderRelativeFilesystem()
        ])
    );
}

/**
 * @param {string} srcPath
 * @returns {Promise<[Object, string[]]>}
 */
async function resolveScopedVars(srcPath) {
    const relativePaths = (await globby([
        nodePath.resolve(srcPath, '**/*.json'),
        `!${ nodePath.resolve(srcPath, '**/_*.json') }`
    ])).map(
        path => nodePath.relative(srcPath, path)
    );

    return [
        relativePaths.reduce((carry, relativePath) => {
            const data = JSON.parse(
                fs.readFileSync(
                    nodePath.resolve(srcPath, relativePath),
                    'utf8'
                )
            );

            const query = relativePath.replace(/\.json$/, '').replaceAll('/', '.');

            lodash.set(carry, query, data);

            return carry;
        }, {}),
        relativePaths.map(
            relativePath => nodePath.resolve(srcPath, relativePath)
        )
    ];
}
