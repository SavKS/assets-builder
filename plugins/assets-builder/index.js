const Path = require('path');
const lodash = require('lodash');
const chokidar = require('chokidar');
const PrettyError = require('pretty-error');
const handler = new PrettyError;

const Twig = require('twig');

const Templater = require('./libs/templater');

const browserSync = require('browser-sync').create();

Twig.cache(false);

function AssetsBuilder(config) {
    this.config = config;
}

AssetsBuilder.prototype.apply = function (compiler) {

    compiler.plugin('after-compile', () => {
        let browserSyncConfig = {
            server: {
                baseDir: this.config.staticPath,
                directory: true
            }
        };

        browserSync.init(
            lodash.merge(
                browserSyncConfig,
                this.config.browserSync || {}
            )
        );

        const watcher = chokidar.watch(Path.resolve(this.config.staticPath, this.config.templater.source), {
            persistent: true,
        });

        const templater = new Templater(
            this.config.templater,
            this.config.staticPath,
            browserSync
        );

        templater.init();

        handler.start();

        process.on('uncaughtException', function (err) {
            console.log(err);
        });

        watcher.on('change', function (path) {
            switch (true) {
                case /\.twig$/i.test(path):
                    return templater.change();
            }
        });
    });
};

module.exports = AssetsBuilder;