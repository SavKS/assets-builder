const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourceMaps = require('gulp-sourcemaps');
const sassImporter = require('node-sass-magic-importer');
const webpack = require('webpack');
const browserSync = require('browser-sync');

const postCssPlugins = require('../postcss.config').plugins;

const browser = browserSync.create();

const buildStyles = (outputPath) => () => {
    return gulp.src('../src/scss/app.scss')
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
        )
        .pipe(
            gulp.dest(outputPath)
        )
        .pipe(
            browser.stream()
        );
};

const bundler = (mode, watch = false) => () => {
    const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

    const config = require(`./webpack/webpack.config.${mode}.${env}`);

    config.watch = watch;

    return new Promise(
        resolve => webpack(config, (err, stats) => {

            if (err) {
                console.log('Webpack', err);
            }

            console.log(
                stats.toString({
                    colors: true
                })
            );

            resolve();
        })
    );
};

gulp.task(
    'scss:pub:dev',
    buildStyles('../../../static/pub/css')
);
gulp.task(
    'scss:src:dev',
    buildStyles('../../../static/src/css')
);

gulp.task(
    'scss:pub:watch',
    () => {
        gulp.watch(
            [ '../src/scss/*.scss', '../src/scss/**/*.scss' ],
            gulp.series('scss:pub:dev')
        );
    }
);
gulp.task(
    'scss:src:watch',
    () => {
        browser.init({
            open: true,
            server: {
                baseDir: '../../../static',
                directory: true
            }
        });

        gulp.watch(
            [ '../src/scss/*.scss', '../src/scss/**/*.scss' ],
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
        'webpack:src:dev'
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
