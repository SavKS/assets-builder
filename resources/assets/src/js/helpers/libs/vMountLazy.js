import Vue from 'vue';
import _each from 'lodash/each';
import _clone from 'lodash/clone';
import _flattenDeep from 'lodash/flattenDeep';

export default function (selector, lazyComponents, callback) {
    let targets;

    if (!selector || !(targets = document.querySelectorAll(selector)).length) {
        return;
    }

    Promise.all(
        _flattenDeep([ lazyComponents ]).map(
            lazyComponent => lazyComponent()
        )
    ).then(components => {
        const component = callback(
            ...components.map(c => c.default)
        );

        _each(targets, el => {
            (new Vue(_clone(component))).$mount(el);
        });
    });
};
