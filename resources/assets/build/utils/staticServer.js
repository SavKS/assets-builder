const gulp = require('gulp');
const browserSync = require('./browserSync');

const config = require('../../config');

module.exports = () => () => {
    browserSync.init(config.browserSync.config);

    gulp
        .watch(config.browserSync.watch)
        .on(
            'change',
            () => {
                console.log(1);
                browserSync.reload()
            }
        );
};
