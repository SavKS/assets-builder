const Twig = require('twig');
const fs = require('fs');
const Path = require('path');
const glob = require('glob');
const lodash = require('lodash');

Twig.cache(false);

function Templater(config, staticPath, reloadBrowserSync) {
    this.config = lodash.defaultsDeep({
        source: './layouts/_includes',
        output: './layouts/render'
    }, config);
    
    this.staticPath = staticPath;
    this.browserSync = reloadBrowserSync;

    this.entry = Path.resolve(this.staticPath, this.config.source);
    this.outputPath = Path.resolve(this.staticPath, this.config.output);
}

Templater.prototype.render = function () {
    glob(this.entry + '/*.twig', {}, (err, files) => {
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
    this.render();
    this.browserSync();
};

Templater.prototype.watchPath = function () {
    return Path.resolve(this.staticPath, this.config.source);
}

module.exports = Templater;