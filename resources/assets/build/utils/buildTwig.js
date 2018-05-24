const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');
const clean = require('gulp-clean');
const prettify = require('gulp-jsbeautifier');
const htmlImages = require('./gulp-html-images');

const config = require('../../config');

const datafile = () => JSON.parse(
    fs.readFileSync(config.layouts.datafile)
);

gulp.task('@twig:build', () => {
    return gulp.src(config.layouts.entries)
        .pipe(
            twig({
                data: datafile()
            })
        )
        .pipe(
            htmlImages({
                srcPath: config.layouts.path.src,
                outputPath: config.layouts.path.output
            })
        )
        .pipe(
            prettify()
        )
        .pipe(
            gulp.dest(config.layouts.path.output)
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
        () => {
            gulp.watch(
                config.layouts.watch,
                gulp.series([
                    '@twig:build'
                ])
            );

            gulp.watch(
                [ config.layouts.datafile ],
                gulp.series([
                    '@twig:build'
                ])
            );
        }
    ]);
};
