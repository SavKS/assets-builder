import _trim from 'lodash/trim';

const staticUrl = _trim(window.App.staticUrl, '/');

export default (path) => `${staticUrl}/${_trim(path, '/')}`;
