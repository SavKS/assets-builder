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

let browserPromise = null;
const getBrowser = () => {
    if (!browserPromise) {
        browserPromise = (async () => {
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
            browser.closeReal = browser.close;
            browser.close = () => {};
            return browser;
        })();
    }

    return browserPromise;
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
        const cssFiles = glob.sync(
            config.current().styles.path.output + '/*.css'
        );

        return gulp.src(config.critical.path.src)
            .pipe(
                through.obj((file, enc, callback) => {
                    (async () => {
                        if (file.isNull()) {
                            return file;
                        }

                        if (file.isStream()) {
                            throw new Error('Streaming not supported!');
                        }

                        const result = await critical.generate({
                            ...config.critical.settings,
                            css: cssFiles,
                            src: file,
                            penthouse: {
                                puppeteer: {
                                    getBrowser
                                }
                            }
                        });

                        const css = result.css.replace(/(url\((.+?)\))/gi, (str, offset, s) => {
                            const url = s.replace('../', '');

                            if (url.indexOf('data:') !== -1) {
                                return `url(${url})`;
                            }

                            return `url({{ ${config.critical.urlFunction}('${url}') }})`;
                        });

                        const fileName = rext(
                            last(
                                last(file.history).split('/')
                            ),
                            '.blade.php'
                        ).replace(/[0-9]+-/, '');

                        await fs.promises.writeFile(
                            `${config.critical.path.blade}/${fileName}`,
                            `<style>${css}</style>`
                        );

                        return file;
                    })()
                        .then(result => callback(null, result))
                        .catch(error => callback(error, file));
                })
            )
            .pipe(
                gulp.dest(config.critical.path.output)
            );
    }
);

gulp.task(
    'critical:close',
    async () => await (await getBrowser()).closeReal()
);

module.exports = () => gulp.series([
    'critical:clean',
    'critical:process',
    'critical:close'
]);
