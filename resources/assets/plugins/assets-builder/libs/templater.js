const Twig = require('twig');
const fs = require('fs');
const Path = require('path');
const glob = require('glob');
const lodash = require('lodash');

Twig.cache(false);

function Templater(config, staticPath, reloadBrowserSync) {
    this.config = lodash.defaultsDeep({
        server: {
            path: Path.resolve('./src/server')
        },
        source: Path.resolve('./src/layouts'),
        output: Path.resolve('../../static/layouts')
    }, config);

    this.staticPath = staticPath;
    this.browserSync = reloadBrowserSync;

    this.entry = Path.resolve(this.staticPath, this.config.source);
    this.outputPath = Path.resolve(this.staticPath, this.config.output);

    const staticPathPrefix = lodash.trim(
        lodash.get(
            this.config,
            'templater.staticPathPrefix',
            '../..'
        ),
        '/'
    );

    Twig.extendFilter('static', (path) => {
        return `${staticPathPrefix}/${path}`;
    });

    Twig.extendFunction('loadState', (value, store) => {
        store = store || value;

        let data;

        try {
            data = fs.readFileSync(`${this.config.server.path}/${value}.json`);
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
    });
}

Templater.prototype.render = function () {
    let data = {};

    if (this.config.dataFile) {
        data = JSON.parse(
            fs.readFileSync(this.config.dataFile)
        );
    }

    glob(this.entry + '/*.twig', {}, (err, files) => {
        files.forEach((filePath) => {
            const publicPath = Path.resolve(
                this.outputPath,
                Path.basename(filePath).replace(/\.twig$/, '.html')
            );

            Twig.renderFile(
                filePath,
                {
                    ...data,

                    settings: {
                        'twig options': {
                            id: filePath
                        }
                    }
                },
                (err, html) => {
                    fs.writeFileSync(publicPath, html);
                }
            );
        });
    });
};

Templater.prototype.init = function () {
    this.render();
};

Templater.prototype.change = function () {
    this.render();
    this.browserSync();
};

Templater.prototype.watchPath = function () {
    return Path.resolve(this.staticPath, this.config.source);
};

module.exports = Templater;
