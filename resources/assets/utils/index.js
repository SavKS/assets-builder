const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassImporter = require('node-sass-magic-importer');
const path = require('path');

exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
            plugins: () => require(
                path.resolve(__dirname, '../postcss.config')
            ).plugins
        }
    };

    const resolveUrlLoader = {
        loader: 'resolve-url-loader'
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [ cssLoader, postcssLoader ] : [ cssLoader ];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                    url: false
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        } else {
            return [ 'vue-style-loader' ].concat(loaders);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        scss: generateLoaders('sass', {
             importer: sassImporter()
        })
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[ extension ];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }

    return output;
};

exports.basePath = (relativePath) => {
    return path.resolve(__dirname, `../../../${relativePath}`);
};
