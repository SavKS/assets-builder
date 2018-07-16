import _camelCase from 'lodash/camelCase';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _some from 'lodash/some';
import _reduce from 'lodash/reduce';
import _isArray from 'lodash/isArray';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';

let __Vue = null;
let __store = null;
let __subscribers = [];

export const taskManager = {
    run(name, promise, params = {}) {
        __store.dispatch('taskManager/run', {
            name,
            promise,
            params
        });
    },
    status(name, withDescendants = false) {
        const activeProcesses = __store.state.taskManager.processes || {};

        if (!withDescendants) {
            return _has(activeProcesses, name);
        }

        return _some(activeProcesses, (process) => {
            return process.name === name
                || process.name.indexOf(`${name}.`) !== -1;
        });
    },
    subscribe(name, callback) {
        if (!_has(__subscribers, name)) {
            __subscribers[ name ] = [];
        }

        __subscribers[ name ].push(callback);
    }
};

export const mapStatuses = (names) => {
    let data = names;

    if (!_isArray(names)) {
        throw new Error('Statuses must be array');
    }

    return _reduce(
        data,
        (carry, data) => {
            let result = data;

            if (_isString(data)) {
                result = {
                    name: data,
                    nested: false
                };
            }

            carry[ _camelCase('ps.' + result.name) ] = function () {
                let process = result.name;

                if (_has(result, 'process')) {
                    process = _isFunction(result.process) ?
                        result.process.bind(this)() :
                        result.process;
                }

                return this.$taskManager.status(
                    process,
                    !!result.nested
                );
            };

            return carry;
        },
        {}
    );
};

const __fire = (name, event, data) => {
    let subscribers;

    if (_isArray(__subscribers[ name ])) {
        subscribers = __subscribers[ name ];
    }

    if (!subscribers) {
        return;
    }

    subscribers.forEach(
        callback => callback(event, data)
    );
};

export default {
    install(Vue) {
        __Vue = Vue;

        __Vue.prototype.$taskManager = taskManager;
    },
    storeRegister(store) {
        __store = store;

        store.registerModule('taskManager', {
            namespaced: true,
            state: {
                processes: {}
            },
            mutations: {
                create: (state, { name, data }) => {
                    __Vue.set(state.processes, name, {
                        name,
                        data
                    });

                    __fire(name, 'start', data);
                },
                kill: (state, name) => {
                    __fire(
                        name,
                        'done',
                        _get(state.processes, `${name}.data`)
                    );

                    __Vue.delete(state.processes, name);
                }
            },
            actions: {
                run: ({ commit }, { name, promise, params = {} }) => {
                    commit('create', {
                        name,
                        data: params.data || {}
                    });

                    if (params.failOnly) {
                        promise.catch(xhr => {
                            if (xhr.response.status >= 400) {
                                commit('kill', name);
                            }
                        });
                    } else {
                        promise
                            .then(() => commit('kill', name))
                            .catch(() => commit('kill', name))
                        ;
                    }

                    return promise;
                }
            }
        });
    }
};
