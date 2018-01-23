import _get from 'lodash/get';
import _set from 'lodash/set';
import _merge from 'lodash/merge';
import _each from 'lodash/each';
import deepForEach from 'deep-for-each';

import store from '@store';

export default function (name, Store) {
    const initialState = _get(window, `__vars.store.${name}`, null);

    if (initialState !== null) {
        const modules = _get(initialState, '@modules', null);

        if (modules !== null) {
            _each(modules, (state, name) => {
                const initState = _get(Store.modules, `${name}.state`, {});

                _set(
                    Store.modules,
                    `${name}.state`,
                    typeConversion({
                        ...initState,
                        ...state
                    })
                )
            });

            delete initialState[ '@modules' ];
        }

        Store.state = typeConversion(
            _merge(Store.state, initialState)
        );
    }

    store.registerModule(name, Store);
}

function typeConversion(data) {
    deepForEach(data, (value, prop, subject, path) => {
        if (value === 'Infinity') {
            _set(data, path, Infinity);
        }
    });

    return data;
}
