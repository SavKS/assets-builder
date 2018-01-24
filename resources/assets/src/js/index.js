import Vue from 'vue';
import _get from 'lodash/get';

import '@store';

import I18n from '@plugins/i18n';
import VueForm from '@plugins/forms';
import TaskManager from '@plugins/taskManager';

import { install as HelpersInstaller, http } from '@helpers';

import SvgImage from '@components/SvgImage.vue';

Vue.component('svg-image', SvgImage);

import '../scss/app.scss';

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
