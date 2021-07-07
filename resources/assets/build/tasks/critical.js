const critical = require('critical');
const { last } = require('lodash');
const log = require('fancy-log');
const fs = require('fs');
const glob = require('glob');
const gulp = require('gulp');
const os = require('os');
const throughConcurrent = require('through2-concurrent');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');
const rimraf = require('rimraf');

const config = require('../../config');

const browsersPool = [];
let browserCounter = 0;

const getBrowser = async () => {
    if (browsersPool.length > 0) {
        return browsersPool.shift();
    }

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

    const close = browser.close.bind(browser);

    browser.close = () => {};

    return {
        number: ++browserCounter,
        browser,
        async recycle() {
            browsersPool.push(this);
        },
        async close() {
            await close();
        }
    };
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

        process.setMaxListeners(10000);

        return gulp.src(config.critical.path.src)
            .pipe(
                throughConcurrent.obj({
                    maxConcurrency: os.cpus().length
                }, (file, enc, callback) => {
                    (async () => {
                        if (file.isNull()) {
                            return file;
                        }

                        if (file.isStream()) {
                            throw new Error('Streaming not supported!');
                        }

                        const criticalId = last(
                                last(file.history).split('/')
                            )
                            .replace(/[0-9]+-/, '')
                            .replace(/\.html$/, '');
                        const fileName = criticalId + '.blade.php';

                        const browser = await getBrowser();

                        log(`[${browser.number}] Critical ${criticalId}: building...`);

                        const result = await critical.generate({
                            ...config.critical.settings,
                            css: cssFiles,
                            src: file,
                            penthouse: {
                                puppeteer: {
                                    getBrowser: () => browser.browser
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

                        log(`[${browser.number}] Critical ${criticalId}: built.`);

                        fs.promises.writeFile(
                            `${config.critical.path.blade}/${fileName}`,
                            `<style>${css}</style>`
                        );

                        browser.recycle();

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
    async () => {
        await Promise.all(
            browsersPool.map(browser => browser.close())
        );
    }
);

module.exports = () => gulp.series([
    'critical:clean',
    'critical:process',
    'critical:close'
]);
