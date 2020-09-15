import _ from 'lodash';

let __Vue = null;
let __store = null;
let __subscribers = [];

const run = (name, promise, params) => {
    let names = _.flattenDeep([ name ]);

    let action, payload;

    if (Promise.resolve(promise) === promise) {
        action = 'run';
        payload = {
            promise,
            params
        };
    } else {
        action = 'runSync';
        payload = {
            params: promise
        };
    }

    names.forEach(name => {
        __store.dispatch(`taskManager/${action}`, {
            name,

            ...payload
        });
    });

    return promise;
};

const kill = (name) => __store.dispatch('taskManager/kill', name);

const status = (name, withDescendants = false) => {
    if (_.isArray(name)) {
        return name.some(
            item => status(item, withDescendants)
        );
    }

    const activeProcesses = __store.state.taskManager.processes || {};

    if (!withDescendants) {
        return _.has(activeProcesses, name);
    }

    return _.some(activeProcesses, (process) => {
        return process.name === name
            || process.name.indexOf(`${name}.`) !== -1
            || process.name.indexOf(`${name}@`) !== -1;
    });
};

const subscribe = (name, callback) => {
    if (!_.has(__subscribers, name)) {
        __subscribers[ name ] = [];
    }

    const index = __subscribers[ name ].length;

    __subscribers[ name ][ __subscribers[ name ].length ] = callback;

    return () => __subscribers.splice(index, 1);
};

const map = parent => (name, withDescendants = false) => status(
    name === '*' ? `${parent}.${name}` : parent,
    withDescendants
);

const list = () => _.keys(__store.state.taskManager.processes);

export const taskManager = {
    run,
    kill,
    status,
    subscribe,
    map,
    list
};

export const mapStatuses = (names) => {
    let data = names;

    if (!_.isArray(names)) {
        throw new Error('Statuses must be array');
    }

    return _.reduce(
        data,
        (carry, data) => {
            let result = data;

            if (_.isString(data)) {
                result = {
                    name: data,
                    deep: false
                };
            }

            carry[ _.camelCase('ps.' + result.name) ] = function () {
                let process = result.name;

                if (_.has(result, 'process')) {
                    process = _.isFunction(result.process) ?
                        result.process.bind(this)(this) :
                        result.process;
                }

                if (_.isArray(process)) {
                    return _.some(
                        process,
                        name => this.$taskManager.status(name, !!result.deep)
                    );
                }

                return this.$taskManager.status(process, !!result.deep);
            };

            return carry;
        },
        {}
    );
};

const __fire = (name, event, data) => {
    let subscribers;

    if (_.isArray(__subscribers[ name ])) {
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

        __Vue.prototype.$taskManager = __Vue.$taskManager = taskManager;
    },
    storeRegisterer(store) {
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
                        _.get(state.processes, `${name}.data`)
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
                },

                runSync: ({ commit }, { name, params = {} }) => {
                    commit('create', {
                        name,
                        data: params.data || {}
                    });
                },

                kill: ({ commit }, name) => commit('kill', name)
            }
        });
    }
};
