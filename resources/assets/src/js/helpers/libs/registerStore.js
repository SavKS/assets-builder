import { get, set, merge, each } from 'lodash';
import deepForEach from 'deep-for-each';

const typeConversion = (data) => {
    deepForEach(data, (value, prop, subject, path) => {
        if (value === 'Infinity') {
            set(data, path, Infinity);
        }
    });

    return data;
};

export default function (name, Store, store) {
    store = store || require('@store').default;

    const initialState = get(window, `__preload.store.${name}`, null);

    if (initialState !== null) {
        const modules = get(initialState, '@modules', null);

        if (modules !== null) {
            each(modules, (state, name) => {
                const initState = get(Store.modules, `${name}.state`, {});

                set(
                    Store.modules,
                    `${name}.state`,
                    typeConversion({
                        ...initState,
                        ...state
                    })
                );
            });

            delete initialState[ '@modules' ];
        }

        Store.state = typeConversion(
            merge(Store.state, initialState)
        );
    }

    store.registerModule(name, Store);
}
