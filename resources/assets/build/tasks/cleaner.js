const fs = require('fs');
const gulp = require('gulp');
const lodash = require('lodash');
const clean = require('gulp-clean');

module.exports = (paths) => () => {
    const filteredPaths = [];

    for (let path of paths) {
        if (fs.existsSync(path)) {
            filteredPaths.push(path);
        }
    }

    if (lodash.isEmpty(filteredPaths)) {
        return new Promise(
            resolve => resolve()
        );
    }

    return gulp.src(filteredPaths, { read: false })
        .pipe(
            clean({ force: true })
        );
};
