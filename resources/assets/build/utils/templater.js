const Twig = require('twig');
const fs = require('fs');
const Path = require('path');
const glob = require('glob');
const lodash = require('lodash');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');
const md5File = require('md5-file');
const browserSync = require('./browserSync');

Twig.cache(false);

function Templater(config, staticPath) {
    this.config = lodash.defaultsDeep({
        source: Path.resolve('./src/layouts'),
        output: Path.resolve('../../static/layouts'),
        assetsPath: Path.resolve('./'),
        urlRules: []
    }, config);

    this.staticPath = staticPath;

    this.entry = Path.resolve(this.staticPath, this.config.source);
    this.outputPath = Path.resolve(this.staticPath, this.config.output);
}

Templater.prototype.render = function () {
    let data = {};

    if (this.config.dataFile) {
        data = JSON.parse(
            fs.readFileSync(this.config.dataFile)
        );
    }

    const publicPath = Path.resolve(
        this.outputPath,
        Path.basename(filePath).replace(/\.twig$/, '.html')
    );

    Twig.renderFile(filePath, data, (err, html) => {
        const $ = cheerio.load(html);
        const self = this;

        $('img').each(function (i, el) {
            const $self = $(this);

            if (!$self.attr('src')) {
                return;
            }

            const newPath = self.loadFile(
                $self.attr('src')
            );

            if (newPath) {
                $self.attr('src', newPath);
            }
        });

        fs.writeFileSync(publicPath, $.html());
    });
};

Templater.prototype.loadFile = function (path) {
    const rule = lodash.find(
        this.config.urlRules,
        rule => rule.test.test(path)
    );

    if (!rule) {
        return path;
    }

    const info = Path.parse(path);
    const from = Path.resolve(rule.from, path);

    if (!fs.existsSync(from)) {
        return '(not-found)';
    }

    const hash = md5File.sync(from).substr(0, 16);
    const to = `${rule.to}/${info.name}.${hash}${info.ext}`;

    if (!fs.existsSync(to)) {
        if (!fs.existsSync(rule.to)) {
            mkdirp.sync(rule.to);
        }

        fs.copyFileSync(from, to);

        console.log('[\x1b[32m%s\x1b[0m] %s \x1b[34m->\x1b[0m %s', 'File moved', from, to);
    }

    return `${rule.publicPath}/${info.name}.${hash}${info.ext}`;
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
