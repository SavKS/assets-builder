const modules = require.context('./modules', true, /\.\/\w+([_-]+\w+)*\/index\.(tsx?|jsx?)$/);

modules.keys().forEach(
    key => modules(key)
);
