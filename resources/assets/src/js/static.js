if (process.env.BUILD_MODE === 'pub') {
    if (process.env.NODE_ENV === 'production') {
        require(`file-loader?name=./vue.[hash:10].js!../../node_modules/vue/dist/vue.min.js`);
        require(`file-loader?name=./vuex.[hash:10].js!../../node_modules/vuex/dist/vuex.min.js`);
        require(`file-loader?name=./lodash.[hash:10].js!../../node_modules/lodash/lodash.min.js`);
    }

    require(`file-loader?name=./vue.[hash:10].js!../../node_modules/vue/dist/vue.js`);
    require(`file-loader?name=./vuex.[hash:10].js!../../node_modules/vuex/dist/vuex.js`);
    require(`file-loader?name=./lodash.[hash:10].js!../../node_modules/lodash/lodash.js`);
} else {
    require(`file-loader?name=./vue.js!../../node_modules/vue/dist/vue.js`);
    require(`file-loader?name=./vuex.js!../../node_modules/vuex/dist/vuex.js`);
    require(`file-loader?name=./lodash.js!../../node_modules/lodash/lodash.js`);
}
