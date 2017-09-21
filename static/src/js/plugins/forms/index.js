import _get from "lodash/get";
import _set from "lodash/set";
import _has from "lodash/has";
import _each from "lodash/each";
import _merge from "lodash/merge";
import _reduce from "lodash/reduce";
import _isPlainObject from "lodash/isPlainObject";
import _isArray from "lodash/isArray";
import _isString from "lodash/isString";
import _isFunction from "lodash/isFunction";

import Get from './Requests/Get';
import Post from './Requests/Post';

let __store;
let __config = {};
let __Vue;
let __models = {};
let __forms = function (name) {};

const __parameters = {};
const __filters = {};

export default {
    registerFilter: (name, filter) => {
        __filters[name] = filter;
    },
    config(config = {}) {
        __config = _merge({}, __config, config);
    },
    install(Vue) {
        __Vue = Vue;

        __forms = (function (name, fields, defaults) {
            __store.dispatch(__getAction('register'), {
                name,
                fields,
                defaults
            });
        }).bind(Vue);

        Vue.prototype.$forms = __forms;
    },
    storeRegister(store) {
        __store = store;

        store.registerModule(__getNamespace(), {
            namespaced: true,
            state: {
                defaults: {},
                edited: {},
                errors: {},
                empty: {},
                update: 0
            },
            mutations: {
                register: (state, {name, fields, defaults = {}}) => {
                    if (__models.hasOwnProperty(name)) {
                        return false;
                    }

                    __Vue.set(
                        state.defaults,
                        name,
                        _reduce(
                            fields,
                            (state, key) => {
                                const defaultValue = _get(defaults, key, null);
                                
                                if (_isPlainObject(defaultValue)) {
                                    state[key] = defaultValue.value || null;

                                    if (_isArray(defaultValue.filters)
                                        && defaultValue.filters.length
                                    ) {
                                        _set(
                                            __parameters,
                                            `${name}.${key}.filters`,
                                            [...defaultValue.filters]
                                        );
                                    } else if (_isFunction(defaultValue.filters)) {
                                        _set(
                                            __parameters,
                                            `${name}.${key}.filters`,
                                            [defaultValue.filters]
                                        );
                                    }

                                } else {
                                    state[key] = defaultValue;
                                }

                                return state;
                            },
                            {}
                        )
                    );

                    __models[name] = __createModel(name, fields);

                    Object.defineProperty(__forms, name, {
                        configurable: true,
                        get: function() {
                            if (!__models.hasOwnProperty(name)) {
                                throw new Error(`Form [${name}] does not exists`);
                            }

                            return __models[name];
                        }
                    });
                },
                set: (state, {name, field, value}) => {
                    if (!state.edited.hasOwnProperty(name)) {
                        __Vue.set(state.edited, name, {});
                    }

                    __Vue.set(state.edited[name], field, value);
                },
                fill: (state, {name, fields}) => {
                    __Vue.set(state.edited, name, fields);
                },
                setDefault: (state, {name, field, value}) => {
                    if (!state.defaults.hasOwnProperty(name)) {
                        __Vue.set(state.defaults, name, {});
                    }

                    __Vue.set(state.defaults[name], field, value || null);
                },
                reset: (state, name) => {
                    __Vue.delete(state.edited, name);
                    __Vue.delete(state.errors, name);
                },
                remove: (state, {name, field}) => {
                    if (!state.edited.hasOwnProperty(name)) {
                        return;
                    }

                    __Vue.delete(state.edited[name], field);
                },
                destroy: (state, name) => {
                    __Vue.delete(__models, name);
                    __Vue.delete(state.defaults, name);
                    __Vue.delete(state.edited, name);

                    delete __forms[name];
                },
                fillErrors: (state, { name, errors }) => {
                    __Vue.set(state.errors, name, errors);
                },
                clearErrors: (state, name) => {
                    __Vue.delete(state.errors, name);
                }
            },
            actions: {
                register: ({ commit }, payload) => {
                    commit('register', payload);
                },
                set: ({ commit }, payload) => {
                    commit('set', payload);
                },
                setDefault: ({ commit }, payload) => {
                    commit('setDefault', payload);
                },
                reset: ({ commit }, name) => {
                    commit('reset', name);
                },
                remove: ({ commit }, name) => {
                    commit('remove', name);
                },
                destroy: ({ commit }, name) => {
                    commit('destroy', name);
                },
                fillErrors: ({ commit }, { name, errors }) => {
                    commit('fillErrors', { name, errors });
                },
                clearErrors: ({ commit }, name) => {
                    commit('clearErrors', name);
                },
            },
        });
    }
};

function __getNamespace() {
    return _get(__config, 'namespace', 'forms');
}

function __getAction(action) {
    return `${__getNamespace()}/${action}`;
}

function __createModel(name, fields) {
    return new __Vue({
        __store,
        computed: {
            errors() {
                let storage = __store.state[__getNamespace()];

                return _get(storage.errors, name, {});
            },
            data() {
                return __createDataModel(name, fields);
            }
        },
        methods: {
            destroy() {
                __store.dispatch(__getAction('destroy'), name);
            },
            remove(field) {
                __store.dispatch(__getAction('remove'), {name, field});
            },
            reset() {
                __store.dispatch(__getAction('reset'), name);
                __store.dispatch(__getAction('clearErrors'), name);
            },
            fill(fields) {
                _each(fields, (value, field) => {
                    __store.dispatch(__getAction('set'), {
                        name,
                        field,
                        value
                    });
                });
            },
            fillDefaults(fields) {
                _each(fields, (value, field) => {
                    __store.dispatch(__getAction('setDefault'), {
                        name,
                        field,
                        value
                    });
                });
            },
            serialize(filter) {
                let data = _reduce(
                    fields,
                    (state, field) => {
                        const value = this.data[field];

                        if (!filter
                            || (filter && filter(value, field))
                        ) {
                            state[field] = value;
                        }

                        return state;
                    },
                    {}
                );

                return data;
            },
            hasChanges(field) {
                let storage = __store.state[__getNamespace()];

                if (!field) {
                    return !!Object.keys(
                        _get(storage.edited, name, {})
                    ).length;
                }

                return _has(storage.edited, `${name}.${field}`);
            },
            request(method) {
                const http = _get(__config, 'httpClient', require('axios'));
                const errorsResolver = (errors) => {
                    __store.dispatch(__getAction('fillErrors'), {
                        name,
                        errors
                    });
                };

                if (['post', 'put', 'patch'].indexOf(method.toLowerCase()) !== -1) {
                    return new Post(this, http, errorsResolver);
                }

                return new Get(this, http, errorsResolver);
            },
            submit(method, url, config = {}, filter) {
                const http = _get(__config, 'httpClient', require('axios'));
                const params = filter ? this.serialize(filter) : this.serialize(filter);
                let response;

                if (['post', 'put', 'patch'].indexOf(method) !== -1) {
                    response = http[method](url, params, config);
                } else {
                    config.params = params;

                    response = http[method](url, config);
                }

                response.catch((data) => {
                    if (data.response.status === 422) {
                        __store.dispatch(__getAction('fillErrors'), {
                            name,
                            errors: data.response.data
                        });
                    }
                });

                return response;
            }
        }
    });
}

function __getDefault(name, field) {
    let storage = __store.state[__getNamespace()];

    return _get(
        storage.defaults,
        `${name}.${field}`,
        null
    );
}

function __getEdited(name, field) {
    let storage = __store.state[__getNamespace()];

    return _get(
        storage.edited,
        `${name}.${field}`,
        null
    );
}

function __createDataModel(name, fields) {
    return new __Vue({
        computed: _reduce(
            fields,
            (state, key) => {
                state[key] = {
                    get: () =>  __getValue(name, key),
                    set(value) {
                        let storage = __store.state[__getNamespace()];
                        let filters = _get(__parameters, `${name}.${key}.filters`);
                        const defaultValue = _get(storage.defaults, `${name}.${key}`);
                        
                        if (filters) {
                            value = __applyFilters(value, filters, __getValue(name, key));
                        }

                        if (value === defaultValue
                            || (defaultValue === null && value === '')
                        ) {
                            __store.dispatch(__getAction('remove'), {name, field: key});
                        } else {
                            __store.dispatch(__getAction('set'), {
                                field: key,
                                name,
                                value
                            });
                        }
                    }
                }

                return state;
            },
            {}
        )
    });
}

function __getValue(name, key) {
    let value = __getEdited(name, key);

    if (value === null) {
        return __getDefault(name, key);
    }

    return value;
}

function __applyFilters(value, filters, oldValue) {
    if (filters.length === 0) {
        return value;
    }

    if (filters.length === 1) {
        return __applyFilter(value, filters[0], oldValue);
    }

    const _filters = [...filters];
    const first = _filters.splice(0, 1)[0];

    return _filters.reduce((carry, filter) => {
        return __applyFilter(carry, filter, oldValue);
    }, __applyFilter(value, first, oldValue));
}

function __applyFilter(value, filter, oldValue) {
    if (_isFunction(filter)) {
        return filter(value, oldValue);
    } else if (_isString(filter)) {
        return __getRegisteredFilter(filter)(value, oldValue);
    }

    throw new Error('Filter must bee registerd or function');
}

function __getRegisteredFilter(name) {
    if (!__filters.hasOwnProperty(name)) {
        throw Error(`Filter [${name}] not registered`);
    }

    return __filters[name];
}