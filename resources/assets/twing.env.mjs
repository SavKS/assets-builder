import { globby } from 'globby';
import lodash from 'lodash';
import fs from 'node:fs';
import nodePath from 'node:path';

import config from './config.mjs';


/** @type {import('twing').TwingEnvironmentOptions} */
export const options = {
    autoescape: false
};

async function loadJson(file) {
    let contents;
    try {
        contents = await fs.promises.readFile(file, 'utf8');
    } catch (e) {
        if (e.code !== 'ENOENT') {
            throw e;
        } else {
            return null;
        }
    }

    return JSON.parse(contents);
}

/**
 * @param {import('webpack').LoaderContext<{}>} loader
 * @param {import('twing').TwingEnvironment} env
 */
export async function configure({ loader, env }) {
    loader.addContextDependency(config.layouts.dataFilesPath);

    loader.addDependency(`${ config.layouts.dataFilesPath }/_global.json`);
    Object.entries(
        await loadJson(`${ config.layouts.dataFilesPath }/_global.json`) ?? {}
    ).forEach(([ key, value ]) => {
        env.addGlobal(key, value);
    });

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
        (await Promise.all(
            relativePaths.map(async relativePath => {
                const data = await loadJson(
                    nodePath.resolve(srcPath, relativePath)
                );

                return [
                    relativePath.replace(/\.json$/, '').replaceAll('/', '.'),
                    data
                ];
            })
        )).reduce((carry, [query, data]) => {
            lodash.set(carry, query, data);

            return carry;
        }, {}),
        relativePaths.map(
            relativePath => nodePath.resolve(srcPath, relativePath)
        )
    ];
}
