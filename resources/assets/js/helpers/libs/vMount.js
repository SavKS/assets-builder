import Vue from 'vue';

import { map, clone } from 'lodash';

export default function (selector, component) {
    let targets;

    if (!selector || !(targets = document.querySelectorAll(selector)).length) {
        return;
    }

    if (!component instanceof Vue) {
        throw new Error('This is not Vue component');
    }

    return map(targets, (el) => {
        const instace = new Vue(clone(component));
        instace.$mount(el);
        return instace;
    });
};
