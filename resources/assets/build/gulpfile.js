const gulp = require('gulp');
const watch = require('gulp-watch');
const path = require('path');

const config = require('../config');

const scss = require('./tasks/scss');
const twig = require('./tasks/twig');
const staticServer = require('./tasks/staticServer');
const bundler = require('./tasks/bundler');
const cleaner = require('./tasks/cleaner');
const optimizeImages = require('./tasks/optimizeImages');

const manifestBuilder = require('./utils/manifestBuilder');

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
    'optimize-images',
    optimizeImages()
);

gulp.task(
    'scss',
    scss()
);

gulp.task(
    'scss:watch',
    scss(true)
);

gulp.task(
    'twig',
    twig()
);

gulp.task(
    'twig:watch',
    twig(true)
);

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

gulp.task(
    'build-manifest:watch',
    () => {
        watch(
            [ '*/**', '*/**/**' ],
            {
                cwd: config.path.output
            },
            file => {
                if (config.manifest.files.includes(file.path)) {
                    manifestBuilder.debounceBuild();
                }
            }
        );
    }
);

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
        '@twig:build',
        'scss',
        'webpack',
        'build-manifest'
    ])
);

gulp.task(
    'pub-watch',
    gulp.series([
        'clean:images',
        'clean:fonts',
        '@twig:build',
        gulp.parallel([
            'scss:watch',
            'webpack:watch',
            'build-manifest:watch'
        ])
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
    gulp.series([
        'clean:images',
        'clean:fonts',
        gulp.parallel([
            'twig:watch',
            'scss:watch',
            'webpack:watch',
            'staticServer'
        ])
    ])
);
