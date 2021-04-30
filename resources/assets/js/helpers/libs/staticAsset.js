import { trim } from 'lodash';

const staticUrl = trim(window.App.staticUrl, '/');

export default (path) => `${staticUrl}/${trim(path, '/')}`;
