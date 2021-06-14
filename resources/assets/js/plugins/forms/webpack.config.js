const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        libraryTarget: 'amd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [ /node_modules/ ]
            },

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};
