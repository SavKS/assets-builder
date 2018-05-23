const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');
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
const changed = require('gulp-changed');
const clean = require('gulp-clean');
const removeOld = require('./gulp-remove-old');
const htmlImages = require('./gulp-html-images');

const config = require('../../config');

const datafile = () => JSON.parse(
    fs.readFileSync(config.layouts.datafile)
);

gulp.task('twig:build', () => {
    return gulp.src(config.layouts.entries)
        .pipe(
            twig({
                data: datafile()
            })
        )
        .pipe(
            changed(config.layouts.path.output, {
                hasChanged: changed.compareContents
            })
        )
        .pipe(
            htmlImages({
                srcPath: config.layouts.path.src,
                outputPath: config.layouts.path.output
            })
        )
        .pipe(
            gulp.dest(config.layouts.path.output)
        );
});

gulp.task('twig:clean', () => {
    if (!fs.existsSync(config.layouts.output)) {
        return new Promise(
            resolve => resolve()
        );
    }

    return gulp.src(config.layouts.output, { read: false })
        .pipe(
            clean({ force: true })
        );
});

module.exports = (watch = false) => {
    if (!watch) {
        return gulp.parallel([
            'twig:clean',
            'twig:build'
        ]);
    }

    return gulp.series([
        'twig:clean',
        'twig:build',
        () => {
            gulp.watch(
                config.layouts.watch,
                gulp.parallel([
                    'twig:build'
                ])
            );

            gulp.watch(
                [ config.layouts.datafile ],
                gulp.parallel([
                    'twig:build'
                ])
            );
        }
    ]);
};
