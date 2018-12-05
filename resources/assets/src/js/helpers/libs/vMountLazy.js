import Vue from 'vue';
import { each, clone, flattenDeep } from 'lodash';

export default function (selector, lazyComponents, callback) {
    let targets;

    if (!selector || !(targets = document.querySelectorAll(selector)).length) {
        return;
    }

    Promise.all(
        flattenDeep([ lazyComponents ]).map(
            lazyComponent => lazyComponent()
        )
    ).then(components => {
        const component = callback(
            ...components.map(c => c.default)
        );

        each(targets, el => {
            (new Vue(clone(component))).$mount(el);
        });
    });
};
