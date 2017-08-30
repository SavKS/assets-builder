const fs = require('fs');
const Path = require('path');
const lodash = require('lodash');
const chokidar = require('chokidar');
const PrettyError = require('pretty-error');
const handler = new PrettyError;
const vfs = require('vinyl-fs');

const Twig = require('twig');

const Templater = require('./libs/templater');

Twig.cache(false);

function AssetsBuilder(config) {
    this.config = config;

    this.changedCss = [];

    this.browserSync = this.config.disableBrowserSync !== true ?
        require('browser-sync').create() :
        null;
}

AssetsBuilder.prototype.apply = function (compiler) {
    
    const init = lodash.once(() => {
        handler.start();

        let browserSyncConfig = {
            server: {
                baseDir: this.config.staticPath,
                directory: true
            }
        };

        setTimeout(() => {
            const templater = new Templater(
                this.config.templater,
                this.config.staticPath,
                this.reloadBrowser.bind(this),
            );

            if (this.browserSync !== null) {
                console.log(
                    '\n#######################################'
                    + '\n############# BrowserSync #############'
                    + '\n#######################################\n'
                );

                this.browserSync.init(
                    lodash.merge(
                        browserSyncConfig,
                        this.config.browserSync || {}
                    )
                );

                this.browserSync.emitter.on('service:running', () => {
                    templater.init();
                });

                const watcher = chokidar.watch(
                    getWatchPath([
                        templater
                    ]),
                    {
                        persistent: true
                    }
                );

                watcher.on('change', (path) => {
                    if (/\.twig$/i.test(path)) {
                        templater.change();
                    }
                });
            } else {
                templater.init();
            }

            process.on('uncaughtException', function (err) {
                console.log(err)
            });
        }, 0);
    });

    compiler.plugin('done', (compiled) => {
        init();

        lodash.each(compiled.compilation.assets, (data, fileName) => {
            if (!data.emitted) {
                return;
            }

            switch (true) {
                case /\.css$/i.test(fileName):
                    this.pushToCssStack(data.existsAt);
                    break;

                default:
                    this.reloadBrowser();
            }
        });
    });
};

function getWatchPath(nodes) {
    return lodash.reduce(nodes, (carry, node) => {
        if (!node.watchPath) {
            return carry;
        }

        const path = node.watchPath();

        if (lodash.isArray(path)) {
            carry = lodash.concat(carry, path);
        } else {
            carry.push(path);
        }

        return carry;
    }, [])
}

AssetsBuilder.prototype.pushToCssStack = function (file) {
    if (this.changedCss.indexOf(file) !== -1) {
        return;
    }

    this.changedCss[this.changedCss.length] = file;

    if (this.browserSync !== null) {
        this.injectCss();
    }
}

AssetsBuilder.prototype.injectCss = lodash.debounce(function () {
    this.changedCss.forEach((file) => vfs.src(file).pipe(this.browserSync.stream()))
    this.changedCss = [];
}, 100);

AssetsBuilder.prototype.reloadBrowser = lodash.debounce(function () {
    if (this.browserSync === null) {
        return;
    }

    this.browserSync.reload();
}, 100);

module.exports = AssetsBuilder;