import { isArray, isObject, reduce, filter } from 'lodash';
import qs from 'qs';

/**
 * @param string uri
 * @param string|number|Array|Object params
 * @return string
 * @throws Error
 */
export default (uri, params, query) => {
    const placeholders = uri
        .split('/')
        .filter((param) => /\{.*\}/.test(param))
        .map((param) => param.replace('{', '').replace('}', ''))
    ;

    let url;

    if (isArray(params)) {
        url = bindArray(uri, placeholders, params);
    } else if (isObject(params)) {
        url = bindObject(uri, placeholders, params);
    } else {
        url = bindString(uri, placeholders, params);
    }

    return query ? `${url}?${qs.stringify(query)}` : url;
};

/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */
function bindArray(url, placeholders, params) {
    const requiredPlaceholders = filter(
        placeholders,
        (value) => value[value.length - 1] !== '?'
    );

    if (params.length < requiredPlaceholders.length) {
        throw new Error('Missed required parameters');
    }

    return reduce(placeholders, (state, placeholder, index) => {
        if (!params[index]
            && requiredPlaceholders.indexOf(placeholder) === -1) {
            return state.replace(`/{${placeholder}}`, '');
        }

        return state.replace(`{${placeholder}}`, params[index]);
    }, url);
}

/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */
function bindObject(url, placeholders, params) {
    return reduce(placeholders, (state, placeholder) => {
        if (!params.hasOwnProperty(placeholder)) {
            throw new Error(`Missed required parameter [${placeholder}]`);
        }

        return state.replace(`{${placeholder}}`, params[placeholder]);
    }, url);
}

/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */
function bindString(url, placeholders, param) {
    if (placeholders.length > 1) {
        throw new Error('Missed required parameters');
    }

    return url.replace(`{${placeholders[0]}}`, param);
}
