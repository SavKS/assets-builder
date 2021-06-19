const rext = require('replace-ext');
const log = require('fancy-log');

module.exports = (file, options = {}) => {
    const data = file.data || Object.assign({}, options.data);

    if (file.isNull()) {
        return '';
    }

    if (file.isStream()) {
        throw new Error('Streaming not supported!');
    }

    data._file   = file;

    if (options.changeExt === false || options.extname === true) {
        data._target = {
            path: file.path,
            relative: file.relative
        };
    } else {
        data._target = {
            path: rext(file.path, options.extname || ''),
            relative: rext(file.relative, options.extname || '')
        };
    }

    const Twig = require('twig');
    const twig = Twig.twig;
    const twigOpts = {
        path: file.path,
        async: false
    };

    if (options.debug !== undefined) {
        twigOpts.debug = options.debug;
    }
    if (options.trace !== undefined) {
        twigOpts.trace = options.trace;
    }
    if (options.base !== undefined) {
        twigOpts.base = options.base;
    }
    if (options.namespaces !== undefined) {
        twigOpts.namespaces = options.namespaces;
    }
    if (options.cache !== true) {
        Twig.cache(false);
    }

    if (options.functions) {
        options.functions.forEach(function (func) {
            Twig.extendFunction(func.name, func.func);
        });
    }

    if (options.filters) {
        options.filters.forEach(function (filter) {
            Twig.extendFilter(filter.name, filter.func);
        });
    }

    if (options.extend) {
        Twig.extend(options.extend);
        delete options.extend;
    }

    if (options.useFileContents) {
        const fileContents = file.contents.toString();
        twigOpts.data = fileContents;
    }

    const template = twig(twigOpts);

    try {
        return template.render(data);
    } catch (e) {
        if (options.errorLogToConsole) {
            log('Twig build' + ' ' + e);
            return '';
        }

        if (typeof options.onError === 'function') {
            options.onError(e);
            return '';
        }

        throw e;
    }
};
