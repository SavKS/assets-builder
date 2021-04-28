const path = require('path');
const gulp = require('gulp');
const image = require('gulp-image');
const gulpCache = require('gulp-cache');
const Cache = require('cache-swap');

const config = require('../../config');

module.exports = () => () => {

    return gulp.src([ `${ config.images.path.output }/**`, `!${ config.images.path.output }/**/demo/**` ])
        .pipe(
            gulpCache(
                image(),
                {
                    fileCache: new Cache({
                        tmpDir: path.join(__dirname, '../../node_modules/.cache'),
                        cacheDirName: 'optimizeImages'
                    })
                }
            )
        )
        .pipe(gulp.dest(config.images.path.output));
};
