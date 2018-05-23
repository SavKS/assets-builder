const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const sassImporter = require('node-sass-magic-importer');
const postCssPlugins = require('../../postcss.config').plugins;
const browserSync = require('./browserSync');
const rename = require('gulp-rename');
const removeOld = require('./gulp-remove-old');

const config = require('../../config');

module.exports = (withRev = false) => () => {
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

    if (withRev) {
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
