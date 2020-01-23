import Vue from 'vue';

import { each, clone } from 'lodash';

export default function (selector, component) {
    let targets;

    if (!selector || !(targets = document.querySelectorAll(selector)).length) {
        return;
    }

    if (!component instanceof Vue) {
        throw new Error('This is not Vue component');
    }

    each(targets, (el) => {
        (new Vue(clone(component))).$mount(el);
    });
};
