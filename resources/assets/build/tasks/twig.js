const fs = require('fs');
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const mkdirp = require('mkdirp');
const clean = require('gulp-clean');
const lodash = require('lodash');
const twigBuilder = require('../utils/twig/builder');
const twigCollectData = require('../utils/twig/collectData');
const htmlCopyImages = require('../utils/html-copy-images');
const gutil = require('gulp-util');
const File = gutil.File;
const rext = require('replace-ext');
const browserSync = require('../utils/browserSync');

const twigConfig = require('../../twig.config');

const config = require('../../config');

const build = () => {
    const fileDirs = config.layouts.entries.map(
        filesPath => path.resolve(
            process.cwd(),
            filesPath
        )
    );

    const fileContents = [];

    const twigOptions = lodash.assign(
        {
            data: twigCollectData()
        },
        twigConfig
    );

    for (let filesDir of fileDirs) {
        glob.sync(filesDir, {}).forEach(file => {
            let gulpFile = new File({
                path: file,
                contents: fs.readFileSync(file)
            });

            fileContents.push({
                path: file,
                name: path.basename(file),
                content: twigBuilder(gulpFile, twigOptions)
            });
        });
    }

    const result = htmlCopyImages(fileContents, {
        staticPath: config.path.output,
        srcPath: config.layouts.path.src,
        outputPath: config.layouts.path.output,
        manifest: config.layouts.manifest,
        hashMask: /\.\w{10}/
    });

    if (!fs.existsSync(config.layouts.path.output)) {
        mkdirp.sync(config.layouts.path.output);
    }

    if (process.env.BUILD_MODE === 'src') {
        result.files.forEach(data => {
            const fileName = rext(data.name, '.html');

            fs.writeFileSync(
                `${ config.layouts.path.output }/${ fileName }`,
                data.content
            );
        });
    }

    fs.writeFileSync(
        config.layouts.manifest,
        JSON.stringify(result.manifest, null, 4)
    );

    browserSync.reload();
};

gulp.task('@twig:build', () => {
    build();

    return new Promise(
        resolve => resolve()
    );
});

gulp.task('@twig:clean', () => {
    if (!fs.existsSync(config.layouts.path.output)) {
        return new Promise(
            resolve => resolve()
        );
    }

    return gulp.src(config.layouts.path.output, { read: false })
        .pipe(
            clean({ force: true })
        );
});

module.exports = (watch = false) => {
    if (!watch) {
        return gulp.series([
            '@twig:clean',
            '@twig:build'
        ]);
    }

    return gulp.series([
        '@twig:clean',
        '@twig:build',
        gulp.parallel([
            () => {
                gulp.watch(
                    config.layouts.watch,
                    gulp.series([
                        '@twig:build'
                    ])
                );

                gulp.watch(
                    [ `${ config.layouts.dataDir }/*.json` ],
                    gulp.series([
                        '@twig:build'
                    ])
                );
            }
        ])
    ]);
};
