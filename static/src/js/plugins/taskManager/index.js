import _get from 'lodash/get';

let __Vue = null;

const mixin = {
    methods: {
        runProcess(process, promise, errorOnly = false, params = {}) {
            this.$store.dispatch('taskManager/run', {
                process,
                promise,
                errorOnly,
                params
            });
        },
        inProcess(process) {
            return _get(
                this.$store.state.taskManager.processes,
                `${process}.status`,
                false
            );
        }
    },
};

export default {
    use: (Vue) => {
        __Vue = Vue;

        __Vue.mixin(mixin);
    },
    mixin,
    storeRegister(store) {
        store.registerModule('taskManager', {
            namespaced: true,
            state: {
                processes: {}
            },
            mutations: {
                create: (state, { process, params }) => {
                    __Vue.set(state.processes, process, {
                        status: true,
                        ...params
                    });
                },
                kill: (state, process) => {
                    __Vue.delete(state.processes, process);
                }
            },
            actions: {
                run: ({ commit }, { process, promise, errorOnly = false, params }) => {
                    commit('create', { process, params })

                    if (errorOnly) {
                        promise.catch(() => commit('kill', process));
                    } else {
                        promise
                            .then(() => commit('kill', process))
                            .catch(() => commit('kill', process))
                        ;
                    }

                    return promise;
                },
            }
        });
    }
};