const gulp = require('gulp');
const watch = require('gulp-watch');

const config = require('../config');

const scss = require('./tasks/scss');
const twig = require('./tasks/twig');
const staticServer = require('./tasks/staticServer');
const bundler = require('./tasks/bundler');
const cleaner = require('./tasks/cleaner');
const optimizeImages = require('./tasks/optimizeImages');
const copyStatic = require('./tasks/copyStatic');

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
    'copy-static',
    copyStatic()
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
    gulp.series(
        [
            'clean:images',
            'clean:fonts',
            '@twig:build',
            'copy-static',
            'scss',
            'webpack',
            'build-manifest',

            process.env.NODE_ENV === 'production' ? 'optimize-images' : null
        ].filter(value => value)
    )
);

gulp.task(
    'pub-watch',
    gulp.series([
        'clean:images',
        'clean:fonts',
        '@twig:build',
        'copy-static',
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
    gulp.series(
        [
            'clean:images',
            'clean:fonts',
            'scss',
            'twig',
            'copy-static',
            'webpack',

            process.env.NODE_ENV === 'production' ? 'optimize-images' : null
        ].filter(value => value)
    )
);

gulp.task(
    'src-watch',
    gulp.series([
        'clean:images',
        'clean:fonts',
        'copy-static',
        gulp.parallel([
            'twig:watch',
            'scss:watch',
            'webpack:watch',
            'staticServer'
        ])
    ])
);
