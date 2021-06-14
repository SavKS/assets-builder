const fs = require('fs');
const lodash = require('lodash');
const log = require('fancy-log');
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
        }
    ],
    filters: []
};
