const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const log = require('fancy-log');
const execa = require('execa');
const config = require('./config');

module.exports = {
    functions: [
        {
            name: 'loadState',
            func(value, store, path) {
                store = store || value;

                let data;

                try {
                    data = JSON.parse(
                        fs.readFileSync(`${ config.layouts.dataDir }/${ value }.json`).toString()
                    );

                    if (path) {
                        data = lodash.get(data, path);
                    }
                } catch (e) {
                    log('[\x1b[31m%s\x1b[0m] %s', 'State read error', e.message);
                }

                return `
                        <script>
                            window.__preload = window.__preload || {};
                            window.__preload.store = window.__preload.store || {};
                            window.__preload.store.${ store } = ${ JSON.stringify(data) };
                        </script>
                    `;
            }
        },
        {
            name: 'fetchState',
            func(value, path, defaults) {
                let data;

                try {
                    const string = fs.readFileSync(`${ config.layouts.dataDir }/${ value }.json`);

                    data = JSON.parse(
                        string.toString()
                    );
                } catch (e) {
                    log('[\x1b[31m%s\x1b[0m] %s', 'State read error', e.message);

                    return defaults;
                }

                return lodash.get(data, path, defaults);
            }
        },
        {
            name: 'assetRev',
            func(assetPath) {
                let manifest;

                try {
                    const string = fs.readFileSync(`${ config.manifest.output }`);

                    manifest = JSON.parse(
                        string.toString()
                    );
                } catch (e) {
                    log('[\x1b[31m%s\x1b[0m] %s', 'Manifest read error', e.message);
                }

                if (!lodash.has(manifest, assetPath)) {
                    log('[\x1b[31m%s\x1b[0m] %s', 'Manifest error', `Asset path [${ assetPath }] not found`);

                    return assetPath;
                }

                return `../${ manifest[ assetPath ] }`;
            }
        },
        {
            name: 'layoutModifiedAt',
            func(name) {
                const filePath = path.join(config.layouts.path.output, `${ name }.html`);

                try {
                    const { stdout } = execa.sync('git', [
                        'log',
                        '-1',
                        '--pretty="format:%ci"',
                        '--',
                        path.relative(config.path.root, filePath)
                    ], {
                        cwd: config.path.root
                    });

                    if (!stdout) {
                        return null;
                    }
                    return lodash.trim(stdout, '"').replace('format:', '');
                } catch (e) {
                    log('[\x1b[31m%s\x1b[0m] %s', 'Can\'t resolve layout modified at', e.message);

                    return null;
                }
            }
        }
    ],
    filters: []
};
