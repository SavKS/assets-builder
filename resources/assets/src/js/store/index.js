import Vue from 'vue';
import Vuex from 'vuex';

import TaskManager from '@plugins/taskManager';
import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';

Vue.use(Vuex);

const modules = () => {
    const files = require.context('./modules', false, /\.js$/);
    const modules = {};

    files.keys().forEach(key => {
        if (key === './index.js') {
            return;
        }
        modules[ key.replace(/(\.\/|\.js)/g, '') ] = files(key).default;
    });

    return modules;
};

export default new Vuex.Store({
    modules: modules(),
    plugins: [
        VueForm.storeRegister,
        I18n.storeRegister,
        TaskManager.storeRegister
    ]
});
