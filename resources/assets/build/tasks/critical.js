const config = require('../../config');
const critical = require('critical');
const { last } = require('lodash');
const fs = require('fs');
const glob = require('glob');
const gulp = require('gulp');
const through = require('through2');
const rext = require('replace-ext');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');
const rimraf = require('rimraf');
const log = require('fancy-log');

const cssFiles = glob.sync(
    config.current().styles.path.output + '/*.css'
);

let lastBrowser = null;

const getBrowser = async () => {
    process.setMaxListeners(10000);

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--single-process'
        ]
    });

    lastBrowser = browser;

    return browser;
};

gulp.task(
    'critical:clean',
    async () => {
        rimraf.sync(config.critical.path.blade);
        mkdirp.sync(config.critical.path.blade);
    }
);

gulp.task(
    'critical:process',
    () => {
        const browserPromise = getBrowser();

        return gulp.src(config.critical.path.src)
            .pipe(
                through.obj(function (file, enc, callback) {
                    if (file.isNull()) {
                        return callback(null, file);
                    }

                    if (file.isStream()) {
                        throw new Error('Streaming not supported!');
                    }

                    const fileName = rext(
                        last(
                            last(file.history).split('/')
                        ),
                        '.blade.php'
                    ).replace(/[0-9]+-/, '');

                    log('Processing: ' + fileName);

                    critical.generate({
                        ...config.critical.settings,
                        css: cssFiles,
                        src: file,
                        penthouse: {
                            ...(config.critical.settings.penthouse ?? {}),
                            unstableKeepBrowserAlive: true,
                            unstableKeepOpenPages: 0,
                            puppeteer: {
                                getBrowser: () => browserPromise
                            }
                        }
                    }).then(result => {
                        const css = result.css.replace(/(url\((.+?)\))/gi, (str, offset, s) => {
                            const url = s.replace('../', '');

                            if (url.indexOf('data:') !== -1) {
                                return `url(${ url })`;
                            }

                            return `url({{ ${ config.critical.urlFunction }('${ url }') }})`;
                        });

                        fs.writeFileSync(
                            `${ config.critical.path.blade }/${ fileName }`,
                            `<style>${ css }</style>`
                        );

                        return callback(null, file);
                    }).catch(err => {
                        return callback(err, file);
                    });
                })
            )
            .pipe(
                gulp.dest(config.critical.path.output)
            );
    }
);

gulp.task(
    'critical:close',
    async () => await lastBrowser?.close()
);

module.exports = () => gulp.series([
    'critical:clean',
    'critical:process',
    'critical:close'
]);
