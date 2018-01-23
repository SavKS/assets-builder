import Vue from 'vue';
import Vuex from 'vuex';

import TaskManager from '@plugins/taskManager';
import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        VueForm.storeRegister,
        I18n.storeRegister,
        TaskManager.storeRegister
    ]
});
