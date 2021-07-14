import _ from 'lodash';

export default (event, parent, selector, handler) => {
    const events = _.isArray(event) ? event : [ event ];

    const parentEls = _.isString(parent) ?
        document.querySelectorAll(parent) :
        (_.isArray(parent) ? parent : [ parent ]);

    const selectors = _.isArray(selector) ? selector : [ selector ];

    events.forEach(eventName => {
        parentEls.forEach(parentEl => {
            parentEl.addEventListener(eventName, event => {
                const { target } = event;

                for (const selector of selectors) {
                    if (target.matches(selector)) {
                        handler(target, event);

                        return;
                    }

                    const realTarget = target.closest(selector);

                    if (realTarget) {
                        handler(realTarget, event);
                    }
                }
            });
        });
    });
};
