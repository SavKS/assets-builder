const lodash = require('lodash');

module.exports = mode => ({ key, value }) => {
    let finalKey = key;
    let finalValue = value;

    if (/\.js$/.test(key)) {
        finalKey = `${ mode }/js/` + lodash.trimStart(key, '/');
        finalValue = 'pub/js/' + lodash.trimStart(value, '/');
    } else if (/\.css/.test(key)) {
        finalKey = `${ mode }/css/` + lodash.trimStart(key, '/');
        finalValue = value.replace('../../', '');
    }

    return {
        key: finalKey,
        value: finalValue
    };
};
