const path = require('path');

module.exports = {
    vue: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/vue/dist/vue.min.js'),
            develop: path.resolve(__dirname, './node_modules/vue/dist/vue.js')
        },
        name: {
            pub: 'vue.[hash:10].js',
            src: 'vue.js'
        }
    },
    vuex: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/vuex/dist/vuex.min.js'),
            develop: path.resolve(__dirname, './node_modules/vuex/dist/vuex.js')
        },
        name: {
            pub: 'vuex.[hash:10].js',
            src: 'vuex.js'
        }
    },
    lodash: {
        type: 'js',
        entry: {
            production: path.resolve(__dirname, './node_modules/lodash/lodash.min.js'),
            develop: path.resolve(__dirname, './node_modules/lodash/lodash.js')
        },
        name: {
            pub: 'lodash.[hash:10].js',
            src: 'lodash.js'
        }
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
