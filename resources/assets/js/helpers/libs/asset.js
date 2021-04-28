import _ from 'lodash';

const [ baseUrl, mode ] = (() => {
    const tag = document.querySelector('script[src$="manifest.json.js"]');

    if (!tag) {
        return [];
    }

    const baseUrl = tag.src.replace(/\w+\/manifest\.json.js$/, '');

    const mode = tag.src.match(/\/(\w+)\/manifest\.json.js$/)[ 1 ];

    return [ baseUrl, mode ];
})();

export default path => {
    const clearPath = _.trim(path, '/').replace('%mode%', mode);

    let finalPath;

    if (/^(js|css)\//.test(clearPath)) {
        finalPath = window.__manifest[ `${ mode }/${ clearPath }` ] || clearPath;
    } else {
        finalPath = window.__manifest[ clearPath ] || clearPath;
    }

    return `${ baseUrl }${ finalPath }`;
};
