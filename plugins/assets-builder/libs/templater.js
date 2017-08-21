const Twig = require('twig');
const fs = require('fs');
const Path = require('path');
const glob = require('glob');
const lodash = require('lodash');

Twig.cache(false);

function Templater(config, staticPath, browserSync) {
    this.config = config;
    this.staticPath = staticPath;
    this.browserSync = browserSync;

    this.sourcePath = Path.resolve(this.staticPath, this.config.source);
    this.outputPath = Path.resolve(this.staticPath, this.config.output);

    this.debounceRender = lodash.debounce(function() {
        this.render();

        this.browserSync.reload();
    }, 300)
}

Templater.prototype.render = function () {
    glob(this.sourcePath + '/*.twig', {}, (err, files) => {
        files.forEach((filePath) => {
            const publicPath = Path.resolve(
                this.outputPath,
                Path.basename(filePath).replace(/\.twig$/, '.html')
            );

            Twig.renderFile(filePath, this.config.data, (err, html) => {
                fs.writeFileSync(publicPath, html);
            });
        });
    });
}

Templater.prototype.init = function () {
    this.render();
};

Templater.prototype.change = function () {
    this.debounceRender();
};

module.exports = Templater;