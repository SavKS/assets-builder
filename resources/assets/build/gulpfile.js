const gulp = require('gulp');

const config = require('../config');

const buildStyles = require('./utils/buildStyles');
const buildTwig = require('./utils/buildTwig');
const manifestBuilder = require('./utils/manifestBuilder');
const browserSync = require('./utils/browserSync');

const bundler = require('./utils/bundler');
// const templater = require('./utils/templater');

gulp.task(
    'scss',
    buildStyles(process.env.BUILD_MODE === 'pub')
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

// gulp.task(
//     'webpack:watch',
//     bundler(true)
// );

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
    'pub-dev',
    gulp.series([
        'scss',
        'webpack',
        'build-manifest'
    ])
);

// gulp.task(
//     'pub-prod',
//     gulp.parallel([
//         'scss:pub:dev',
//         'webpack:pub:dev'
//     ])
// );
//
// gulp.task(
//     'pub-watch',
//     gulp.parallel([
//         'scss:pub:dev',
//         'scss:pub:watch',
//         'webpack:pub:watch'
//     ])
// );
//
/*
|--------------------------------------------------------------------------
| Src tasks
|--------------------------------------------------------------------------
*/
gulp.task(
    'src-dev',
    gulp.series([
        'scss',
        'twig',
        // 'webpack'
    ])
);

// gulp.task(
//     'src-prod',
//     gulp.parallel([
//         'scss:src:dev',
//         'webpack:src:dev'
//     ])
// );
//
gulp.task(
    'src-watch',
    gulp.parallel([
        'twig:watch'
        // 'scss:src:watch',
        // 'webpack:src:watch'
    ])
);
