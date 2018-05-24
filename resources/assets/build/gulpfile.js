const fs = require('fs');
const gulp = require('gulp');

const config = require('../config');

const buildStyles = require('./utils/buildStyles');
const buildTwig = require('./utils/buildTwig');
const manifestBuilder = require('./utils/manifestBuilder');
const staticServer = require('./utils/staticServer');

const bundler = require('./utils/bundler');
const cleaner = require('./tasks/cleaner');

const clean = require('gulp-clean');

gulp.task(
    'clean:images',
    cleaner([
        config.images.path.output
    ])
);
gulp.task(
    'clean:fonts',
    cleaner([
        config.fonts.path.output
    ])
);

gulp.task(
    'staticServer',
    staticServer()
);

gulp.task(
    'scss',
    buildStyles()
);

gulp.task(
    'scss:watch',
    buildStyles(true)
);

gulp.task(
    'twig',
    buildTwig()
);

gulp.task(
    'twig:watch',
    buildTwig(true)
);

// gulp.task(
//     'scss:watch',
//     () => {
//         gulp.watch(
//             config.styles.watch,
//             gulp.series('scss')
//         );
//     }
// );
// gulp.task(
//     'scss:src:watch',
//     () => {
//         browserSync.init(config.browserSync);
//
//         gulp.watch(
//             config.styles.watch,
//             gulp.series('scss:src:dev')
//         );
//     }
// );

gulp.task(
    'webpack',
    bundler()
);

gulp.task(
    'webpack:watch',
    bundler(true)
);

gulp.task(
    'build-manifest',
    () => manifestBuilder.build()
);

// gulp.task(
//     'build-manifest:watch',
//     () => {
//         gulp.watch(
//             config.manifest.files,
//             gulp.series(`scss:${process.env.BABEL_ENV}:dev`)
//         );
//     }
// );
//
/*
|--------------------------------------------------------------------------
| Pub tasks
|--------------------------------------------------------------------------
*/
gulp.task(
    'pub',
    gulp.series([
        'clean:images',
        'clean:fonts',
        'scss',
        'webpack',
        'build-manifest'
    ])
);

gulp.task(
    'pub-watch',
    gulp.parallel([
        'clean:images',
        'clean:fonts',
        'twig:watch',
        'scss:watch',
        'webpack:watch',
        'build-manifest'
    ])
);

/*
|--------------------------------------------------------------------------
| Src tasks
|--------------------------------------------------------------------------
*/
gulp.task(
    'src',
    gulp.series([
        'clean:images',
        'clean:fonts',
        'scss',
        'twig',
        'webpack'
    ])
);

gulp.task(
    'src-watch',
    gulp.parallel([
        'clean:images',
        'clean:fonts',
        'twig:watch',
        'scss:watch',
        'webpack:watch',
        'staticServer'
    ])
);
