const gulp = require('gulp');
const image = require('gulp-image');

const config = require('../../config');

module.exports = () => () => {

    return gulp.src([`${config.images.path.output}/**`])
        .pipe(image())
        .pipe(gulp.dest(config.images.path.output));
};
