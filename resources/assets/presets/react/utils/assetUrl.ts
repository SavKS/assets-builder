export default (path: string) => [
    window.App.staticUrl?.replace(/\/$/, ''),
    path.replace(/^\//, '')
].join('/');
