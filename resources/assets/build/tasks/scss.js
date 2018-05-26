const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const sassImporter = require('node-sass-magic-importer');
const postCssPlugins = require('../../postcss.config').plugins;
const browserSync = require('../utils/browserSync');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const removeOld = require('../plugins/gulp-remove-old');

const config = require('../../config');

const build = () => () => {
    const currentConfig = config.current();

    let stream = gulp.src(config.styles.entries)
        .pipe(
            sourceMaps.init()
        )
        .pipe(
            sass({
                importer: sassImporter()
            }).on('error', sass.logError)
        )
        .pipe(
            postcss(postCssPlugins)
        )
        .pipe(
            sourceMaps.write()
        );

    if (process.env.BUILD_MODE === 'pub') {
        return stream
            .pipe(
                rename({
                    dirname: currentConfig.styles.baseUri
                })
            )
            .pipe(
                rev()
            )
            .pipe(
                revFormat({
                    prefix: '.'
                })
            )
            .pipe(
                gulp.dest(config.path.output)
            )
            .pipe(
                browserSync.stream()
            )
            .pipe(
                removeOld()
            )
            .pipe(
                rev.manifest({
                    path: 'manifest.json'
                })
            )
            .pipe(
                gulp.dest(
                    path.parse(currentConfig.styles.manifest).dir
                )
            )
            .pipe(
                removeOld({
                    manifest: true,
                    staticPath: config.path.output
                })
            );
    }

    return stream
        .pipe(
            gulp.dest(currentConfig.styles.path.output)
        )
        .pipe(
            browserSync.stream()
        );
};

gulp.task('@scss:clean', () => {
    if (!fs.existsSync(config.current().styles.path.output)) {
        return new Promise(
            resolve => resolve()
        );
    }

    return gulp.src(config.current().styles.path.output, { read: false })
        .pipe(
            clean({ force: true })
        );
});

gulp.task(
    '@scss:build',
    build()
);

module.exports = (watch = false) => {
    if (!watch) {
        return gulp.series([
            '@scss:clean',
            '@scss:build'
        ]);
    }

    return gulp.series([
        '@scss:clean',
        '@scss:build',
        () => {
            gulp.watch(
                config.styles.watch,
                gulp.series([
                    '@scss:build'
                ])
            );
        }
    ]);
};
