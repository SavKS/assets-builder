import Vue from 'vue';
import _get from 'lodash/get';

import '@store';

import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';
import TaskManager from '@plugins/taskManager';

import { http, install as HelpersInstaller } from '@helpers';

import VSvgImage from '@components/VSvgImage';

Vue.component('v-svg-image', VSvgImage);

VueForm.config({
    httpClient: http
});

I18n.config({
    currentLanguage: _get(window, 'App.currentLanguage', 'en'),
    dictionary: _get(window, '__vars.store.i18n', {})
});

Vue.use(HelpersInstaller);
Vue.use(I18n);
Vue.use(VueForm);
Vue.use(TaskManager);

VueForm.preload(
    _get(window, '__vars.forms', {})
);

require('popper.js');
require('bootstrap');

const files = require.context('./modules', true, /\.\/\w+([\_\-]+\w+)*\/index\.js$/);

files.keys().forEach(
    key => files(key)
);
