import Vue from 'vue';
import Vuex from 'vuex';
import { get } from 'lodash';

import TaskManager from '@plugins/taskManager';
import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';
import { registerStore } from '@helpers';

import { VUEX_DEEP_SET } from 'vue-deepset';

I18n.config({
    currentLanguage: get(window, 'App.currentLanguage', 'en'),
    dictionary: get(window, '__preload.store.i18n', {})
});

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        VueForm.storeRegisterer,
        I18n.storeRegister,
        TaskManager.storeRegisterer
    ],
    mutations: {
        VUEX_DEEP_SET
    }
});

const files = require.context('../modules', true, /\/store\/index\.js$/);

files.keys().forEach(key => {
    const name = key.replace('./', '').replace('/store/index.js', '');
    const data = files(key).default;

    registerStore(name, data, store);
});

export default store;
