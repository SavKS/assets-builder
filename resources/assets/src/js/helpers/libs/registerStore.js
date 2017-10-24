import _get from 'lodash/get';
import _merge from 'lodash/merge';

export default function (name, Store) {
    const initialState = _get(window, `__vars.store.${name}`, null);
    
    if (initialState !== null) {
        const modules = _get(initialState, 'modules', null);

        if (modules !== null) {
            Store.modules = _merge(Store.modules, modules);

            delete initialState.modules;
        }

        Store.state = _merge(Store.state, initialState);
    }

    store.registerModule(name, Store);
}