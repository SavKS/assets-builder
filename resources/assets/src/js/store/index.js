import Vue from 'vue';
import Vuex from 'vuex';

import TaskManager from '@plugins/taskManager';
import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';
import { registerStore } from '@helpers';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        VueForm.storeRegister,
        I18n.storeRegister,
        TaskManager.storeRegister
    ]
});

const files = require.context('../modules', true, /store\/index\.js$/);

files.keys().forEach(key => {
    const name = key.replace('./', '').replace('/store/index.js', '');
    const data = files(key).default;

    registerStore(name, data, store);
});

export default store;
