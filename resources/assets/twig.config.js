const fs = require('fs');
const lodash = require('lodash');
const config = require('./config');

module.exports = {
    functions: [
        [
            {
                name: 'loadState',
                func(value, store) {
                    store = store || value;

                    let data;

                    try {
                        data = fs.readFileSync(`${config.dataServer.path}/${value}.json`);
                    } catch (e) {
                        console.log('[\x1b[31m%s\x1b[0m] %s', 'State read error', e.message);
                    }

                    return `
                        <script>
                            window.__vars = window.__vars || {};
                            window.__vars.store = window.__vars.store || {};
                            window.__vars.store.${store} = ${data};
                        </script>
                    `;
                }
            },
            {
                name: 'fetchState',
                func(value, path, defaults) {
                    let data;

                    try {
                        const string = fs.readFileSync(`${config.dataServer.path}/${value}.json`);

                        data = JSON.parse(
                            string.toString()
                        );
                    } catch (e) {
                        console.log('[\x1b[31m%s\x1b[0m] %s', 'State read error', e.message);

                        return defaults;
                    }

                    return lodash.get(data, path, defaults);
                }
            }
        ]
    ],
    filters: []
};
