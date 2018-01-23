import Vue from 'vue';

import _each from 'lodash/each';
import _clone from 'lodash/clone';

export default function (selector, component) {
    let targets;

    if (!selector || ! (targets = document.querySelectorAll(selector)).length) {
        return;
    }

    if (!component instanceof Vue) {
        throw new Error('This is not Vue component');
    }

    _each(targets, (el) => {
        (new Vue(_clone(component))).$mount(el);
    });
};
