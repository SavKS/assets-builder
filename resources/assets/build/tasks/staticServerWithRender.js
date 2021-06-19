const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const glob = require('glob');
const dayjs = require('dayjs');
const url = require('url');
const lodash = require('lodash');
const gutil = require('gulp-util');
const colors = require('colors/safe');
const mkdirp = require('mkdirp');

const browserSync = require('../utils/browserSync');
const twigBuilder = require('../utils/twig/builder');
const twigCollectData = require('../utils/twig/collectData');
const htmlCopyImages = require('../utils/html-copy-images');

const config = require('../../config');
const twigConfig = require('../../twig.config');

const twigOptions = (extraData = {}) => lodash.assign(
    {
        data: {
            ...twigCollectData(),

            ...extraData
        }
    },
    twigConfig
);

const writeToLayoutsManifest = data => {
    const dirPath = path.dirname(config.layouts.manifest);

    if (!fs.existsSync(dirPath)) {
        mkdirp.sync(dirPath);
    }

    let oldData = {};

    if (fs.existsSync(config.layouts.manifest)) {
        oldData = JSON.parse(
            fs.readFileSync(config.layouts.manifest)
        );
    }

    fs.writeFileSync(
        config.layouts.manifest,
        JSON.stringify(
            {
                ...oldData,

                ...data
            },
            null,
            4
        )
    );
};

module.exports = () => () => {
    if (fs.existsSync(config.layouts.manifest)) {
        fs.unlinkSync(config.layouts.manifest);
    }

    browserSync.init({
        ...config.browserSync.config,

        middleware: [
            {
                route: '/',
                handle: (request, response) => {
                    const entriesTplPath = path.resolve(
                        __dirname,
                        './staticServerWithRender/entries.twig'
                    );

                    const entries = glob
                        .sync(`${ config.layouts.path.src }/*.twig`)
                        .reduce((carry, pageTplPath) => {
                            const stats = fs.statSync(pageTplPath);

                            carry.push({
                                name: path.basename(pageTplPath, '.twig'),
                                date: dayjs(stats.mtime || stats.ctime).format('DD.MM.YYYY HH:mm:ss')
                            });

                            return carry;
                        }, []);

                    const content = twigBuilder(
                        new gutil.File({
                            path: entriesTplPath,
                            contents: fs.readFileSync(entriesTplPath)
                        }),
                        twigOptions({ entries })
                    );

                    response.setHeader('Content-Type', 'text/html');
                    response.write(content);
                    response.end();
                }
            },
            (request, response, next) => {
                const pathname = url.parse(request.url).pathname;

                if (!pathname.match(/^\/build\/layouts\//)) {
                    return next();
                }

                if (!pathname.match('\.html$')) {
                    response.statusCode = 404;
                    response.write('<h1>404 File not found</h1>');
                    response.end();

                    return;
                }

                const tplName = path.basename(pathname, '.html');

                const tplPath = `${ config.layouts.path.src }/${ tplName }.twig`;

                if (!fs.existsSync(tplPath)) {
                    response.statusCode = 404;
                    response.write('<h1>404 File not found</h1>');
                    response.end();
                }

                const timeLogName = `[${ colors.green('Twig render') }] ${ colors.magenta(`${ tplName }.twig`) }`;

                console.time(timeLogName);

                let content = twigBuilder(
                    new gutil.File({
                        path: tplPath,
                        contents: fs.readFileSync(tplPath)
                    }),
                    twigOptions()
                );

                const result = htmlCopyImages(
                    [
                        {
                            content,
                            path: tplPath
                        }
                    ],
                    {
                        staticPath: config.path.output,
                        srcPath: config.layouts.path.src,
                        outputPath: config.layouts.path.output,
                        manifest: config.layouts.manifest,
                        hashMask: /\.\w{10}/
                    }
                );

                writeToLayoutsManifest(result.manifest);

                console.timeEnd(timeLogName);

                response.setHeader('Content-Type', 'text/html');
                response.write(result.files[ 0 ].content);
                response.end();
            }
        ]
    });

    gulp.watch(
        [
            ...config.layouts.watch,

            `${ config.layouts.dataDir }/*.json`
        ],
        gulp.series([
            async () => {
                browserSync.reload();
            }
        ])
    );
};
