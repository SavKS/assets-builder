import _has from 'lodash/has';
import _some from 'lodash/some';

let __Vue = null;
let __store = null;

const taskManager = {
    run(name, promise, params = {}) {
        __store.dispatch('taskManager/run', {
            name,
            promise,
            params
        });
    },
    status(name, includeParents = false) {
        const activeProcesses = __store.state.taskManager.processes || {};

        if (!includeParents) {
            return _has(activeProcesses, name);
        }

        return _some(activeProcesses, (process) => {
            return process.name === name
                || process.name.indexOf(`${name}.`) !== -1;
        });
    }
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
                },
                kill: (state, name) => {
                    __Vue.delete(state.processes, name);
                }
            },
            actions: {
                run: ({ commit }, { process: name, promise, params = {} }) => {
                    commit('create', {
                        name,
                        data: params.data || {}
                    });

                    if (params.errorOnly) {
                        promise.catch(() => commit('kill', name));
                    } else {
                        promise
                            .then(() => commit('kill', name))
                            .catch(() => commit('kill', name))
                        ;
                    }

                    return promise;
                },
            }
        });
    }
};
