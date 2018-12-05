import { each, concat, clone } from 'lodash';

function init(el, component, rootParams = {}, componentParams = {}) {
    const tmpEl = document.createElement(el.tagName);
    tmpEl.classList.add('hide');

    el.parentNode.insertBefore(tmpEl, el);

    (new Vue({
        ...rootParams,
        render(h) {
            component.mixins = concat(component.mixins || [], [
                {
                    mounted() {
                        this.$el.style && this.$el.style.removeProperty('display');
                        el.remove();
                    }
                }
            ]);

            return h(component, {
                style: {
                    display: 'none'
                },
                ...componentParams
            });
        }
    })).$mount(tmpEl);
}

export default function (selector, component, rootParams = {}, componentParams = {}) {
    let targets;

    if (selector instanceof HTMLElement) {
        return init(selector, clone(component), rootParams, componentParams);
    }

    if (!selector || !(targets = document.querySelectorAll(selector)).length) {
        return;
    }

    if (!component instanceof Vue) {
        throw new Error('This is not Vue component');
    }

    each(targets, (el) => init(
        el,
        clone(component),
        rootParams,
        componentParams
    ));
};
