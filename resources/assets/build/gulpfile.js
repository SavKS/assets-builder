const gulp = require('gulp');

const config = require('../config');

const buildStyles = require('./utils/buildStyle');
const browserSync = require('./utils/browserSync');

const bundler = require('./utils/bundler');
// const templater = require('./utils/templater');

gulp.task(
    'scss:pub:dev',
    buildStyles('pub', true)
);
gulp.task(
    'scss:src:dev',
    buildStyles('src')
);

gulp.task(
    'scss:pub:watch',
    () => {
        gulp.watch(
            config.style.watch,
            gulp.series('scss:pub:dev')
        );
    }
);
gulp.task(
    'scss:src:watch',
    () => {
        browserSync.init(config.browserSync);

        gulp.watch(
            config.style.watch,
            gulp.series('scss:src:dev')
        );
    }
);

gulp.task(
    'webpack:pub:dev',
    bundler('pub')
);
gulp.task(
    'webpack:src:dev',
    bundler('src')
);

gulp.task(
    'webpack:pub:watch',
    bundler('pub', true)
);
gulp.task(
    'webpack:src:watch',
    bundler('src', true)
);

gulp.task(
    'pub-dev',
    gulp.parallel([
        'scss:pub:dev',
        'webpack:pub:dev'
    ])
);
gulp.task(
    'src-dev',
    gulp.parallel([
        'scss:src:dev',
        // 'webpack:src:dev'
    ])
);

gulp.task(
    'pub-prod',
    gulp.parallel([
        'scss:pub:dev',
        'webpack:pub:dev'
    ])
);
gulp.task(
    'src-prod',
    gulp.parallel([
        'scss:src:dev',
        'webpack:src:dev'
    ])
);

gulp.task(
    'pub-watch',
    gulp.parallel([
        'scss:pub:watch',
        'webpack:pub:watch'
    ])
);
gulp.task(
    'src-watch',
    gulp.parallel([
        'scss:src:watch',
        'webpack:src:watch'
    ])
);
