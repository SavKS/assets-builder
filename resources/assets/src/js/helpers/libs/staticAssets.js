import _trim from 'lodash/trim';

const staticUrl = _trim(window.Laravel.staticUrl, '/');

export default (path) => `${staticUrl}/${_trim(path, '/')}`;