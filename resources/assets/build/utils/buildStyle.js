const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revDel = require('rev-del');
const revFormat = require('gulp-rev-format');
const sassImporter = require('node-sass-magic-importer');
const postCssPlugins = require('../../postcss.config').plugins;
const browserSync = require('./browserSync');
const rename = require('gulp-rename');
const removeOld = require('./gulp-remove-old');

const config = require('../../config');

module.exports = (mode, withRev = false) => () => {
    const currentConfig = config.env[ mode ];

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
                gulp.dest(config.staticPath)
            )
            .pipe(
                browserSync.stream()
            )
            .pipe(
                removeOld()
            )
            .pipe(
                rev.manifest({
                    merge: true,
                    path: 'manifest.json'
                })
            )
            .pipe(
                revDel({
                    oldManifest: `${currentConfig.basePath}/manifest.json`
                })
            )
            .pipe(
                gulp.dest(currentConfig.basePath)
            )
            .pipe(
                removeOld({
                    manifest: true,
                    staticPath: config.staticPath
                })
            );
    }

    return stream
        .pipe(
            gulp.dest(currentConfig.styles.output)
        )
        .pipe(
            browserSync.stream()
        );
};
