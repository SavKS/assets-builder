import 'regenerator-runtime/runtime';

import Vue from 'vue';
import { get } from 'lodash';

import '@store';

import I18n from '@plugins/i18n';
import VueForm from '@shelter/vue-forms';
import TaskManager from '@plugins/taskManager';
import './polyfills/closest';

import { http, install as HelpersInstaller } from '@helpers';

import VSvg from '@components/VSvg';
import VField from '@components/VField';

Vue.component('v-svg', VSvg);
Vue.component('v-field', VField);

VueForm.config({
    httpClient: http
});

Vue.use(HelpersInstaller);
Vue.use(I18n);
Vue.use(VueForm);
Vue.use(TaskManager);

VueForm.preload(
    get(window, '__preload.forms', {})
);

Vue.directive('log', {
    inserted(el, bindings) {
        console.log(bindings.value);
    },
    update(el, bindings) {
        console.log(bindings.value);
    }
});

const files = require.context('./modules', true, /\.\/\w+([\_\-]+\w+)*\/index\.js$/);

files.keys().forEach(
    key => files(key)
);
