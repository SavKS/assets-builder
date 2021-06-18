const path = require('path');

module.exports = {
    vue: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/vue/dist/vue.min.js'),
            develop: path.resolve(__dirname, './node_modules/vue/dist/vue.js')
        },
        name: 'vue.[hash:10].js'
    },
    vuex: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/vuex/dist/vuex.min.js'),
            develop: path.resolve(__dirname, './node_modules/vuex/dist/vuex.js')
        },
        name: 'vuex.[hash:10].js'
    },
    lodash: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/lodash/lodash.min.js'),
            develop: path.resolve(__dirname, './node_modules/lodash/lodash.js')
        },
        name: 'lodash.[hash:10].js'
    },
    focusVisible: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/focus-visible/dist/focus-visible.min.js'),
            develop: path.resolve(__dirname, './node_modules/focus-visible/dist/focus-visible.js')
        },
        name: 'focus-visible.[hash:10].js'
    }
};

// Example

// Supported types: js, css, image

// key: {
//     type: 'type',
//     entry: path.resolve(__dirname, './path_to_file/fileName.ext'),
//     name: 'fileName.ext'
// }

// key: {
//     type: 'type',
//     entry: {
//         production: path.resolve(__dirname, './path_to_file/fileName.ext'),
//         develop: path.resolve(__dirname, './path_to_file/fileName.ext'),
//     },
//     name: {
//        pub: 'fileName.ext',
//        src: 'fileName.ext',
//     }
// }

// \Example
