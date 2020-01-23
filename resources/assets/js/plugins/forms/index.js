import Vue from 'vue';

import _ from 'lodash';
import { deepModel } from 'vue-deepset';
import qs from 'qs';

let __store;
let __config = {
    defaultRequestType: 'json',
    paramsSerializer: (params) => qs.stringify(params)
};
let __models = {};
let __forms = function (name) {};

function preparePostData(data, dataType = __config.defaultRequestType) {
    if (dataType === 'json') {
        return data;
    }

    return _.reduce(
        data,
        (carry, value, name) => {
            if (_.isArray(value) || _.isPlainObject(value)) {
                _.each(value, (item, key) => {
                    carry.append(`${name}[${key}]`, item);
                });
            } else {
                carry.append(name, value);
            }

            return carry;
        },
        new FormData
    );
}

function __namespace() {
    return _.get(__config, 'namespace', 'forms');
}

function __action(action) {
    return __namespace() + '/' + action;
}

function __getter(getter) {
    return __namespace() + '/' + getter;
}

function __createModel(name) {
    return new Vue({
        data: () => ({
            old: {}
        }),
        store: __store,
        computed: {
            name: () => name,

            errors() {
                let storage = __store.state[ __namespace() ];

                return _.get(storage.errors, name, {});
            },

            response() {
                let storage = __store.state[ __namespace() ];

                return _.get(storage.responses, name, null);
            },

            data() {
                return deepModel.bind(this)(`${__namespace()}.data.${name}`);
            }
        },
        methods: {
            formatErrors(names, delimiter = '. ') {
                const errors = _.flattenDeep([names])
                    .map(name => {
                        if (!this.errors[ name ]) {
                            return null;
                        }

                        return this.errors[ name ];
                    })
                    .filter(value => value);

                if (!errors.length) {
                    return null;
                }

                return errors.join(delimiter);
            },

            hasErrors(...names) {
                if (names.length === 0) {
                    return !_.isEmpty(this.errors);
                }

                return _.flattenDeep([names]).some(
                    name => !!this.errors[ name ]
                );
            },

            remove(field) {
                return __store.dispatch(__action('remove'), { name, field });
            },

            reset(data = {}) {
                return Promise.all([
                    this.setData(data),
                    __store.dispatch(__action('clearErrors'), name)
                ]);
            },

            fill(fields) {
                _.each(fields, (value, field) => {
                    this.data[ field ] = value;
                });
            },

            setData(data = {}, remember = true) {
                const request = __store.dispatch(__action('setData'), {
                    name,
                    data
                });

                if (remember) {
                    request.then(
                        () => this.remember()
                    );
                }

                return request;
            },

            submit(method, url, options = {}) {
                const data = _.assign(
                    options.filter ? _.pickBy(this.data, options.filter) : this.data,
                    options.data || {}
                );
                const queryParams = options.params || {};
                const http = __config.httpClient || require('axios');

                let response;

                if (method.toLowerCase() === 'post') {
                    response = http[ method ](
                        url,
                        preparePostData(data, options.dataType),
                        {
                            ...(options.config || {}),

                            params: queryParams
                        }
                    );
                } else {
                    response = http[ method ](url, {
                        params: _.assign(data, queryParams),
                        ...options.config || {}
                    });
                }

                response.catch((data) => {
                    if (data.response.status === 422) {
                        __store.dispatch(__action('fillErrors'), {
                            name,
                            errors: data.response.data.errors
                        });
                    }
                });

                response.then(data => {
                    __store.dispatch(__action('clearErrors'), name);

                    __store.dispatch(__action('setResponse'), {
                        name,
                        data
                    });
                });

                return response;
            },

            onChange(callback, config = {}) {
                return this.watch(null, callback, config);
            },

            watch(field = null, callback, config = {}) {
                const path = field !== null ?
                    `${__namespace()}.data.${name}.${field}` :
                    `${__namespace()}.data.${name}`;

                let oldValue = typeof _.get(__store.state, path) !== 'undefined' ?
                    JSON.parse(
                        JSON.stringify(
                            _.get(__store.state, path)
                        )
                    ) :
                    undefined;

                return this.$store.watch(
                    store => ({
                        result: _.get(store, path)
                    }),
                    ({ result }) => {
                        if (JSON.stringify(result) !== JSON.stringify(oldValue)) {
                            callback(result, oldValue);

                            oldValue = undefined !== result ?
                                JSON.parse(
                                    JSON.stringify(result)
                                ) :
                                undefined;
                        }
                    },
                    {
                        deep: field === null,

                        ...config
                    }
                );
            },

            remember() {
                this.$data.old = JSON.parse(
                    JSON.stringify(this.data)
                );

                return this;
            },

            restore() {
                this.setData(this.$data.old);

                return this;
            },

            changed(field) {
                if (!this.$data.old) {
                    return false;
                }

                let oldValue, currentValue;

                if (!field) {
                    oldValue = this.$data.old;
                    currentValue = this.data;
                } else {
                    oldValue = _.get(this.$data.old, field);
                    currentValue = _.get(this.data, field);
                }

                return JSON.stringify(oldValue) !== JSON.stringify(currentValue);
            }
        }
    });
}

export default {
    forms: (name, data) => __forms(name, data),
    config(config = {}) {
        __config = _.merge({}, __config, config);
    },
    install(Vue) {
        Vue = Vue;

        __forms = (function (name, data) {
            if (!_.has(__models, name)) {
                __store.dispatch(__action('register'), {
                    name,
                    data
                });
            }

            return __models[ name ];
        }).bind(Vue);

        Vue.prototype.$forms = __forms;

        Vue.prototype.$thisForm = function (resource = null) {
            if (typeof this.$options.form === 'undefined') {
                throw new Error('Form name not defined');
            }

            const formName = _.isFunction(this.$options.form) ?
                this.$options.form.bind(this)() :
                this.$options.form;

            return resource !== null ?
                this.$forms(formName)[ resource ] :
                this.$forms(formName);
        };

        Vue.$forms = __forms;
    },
    storeRegisterer(store) {
        __store = store;

        store.registerModule(__namespace(), {
            namespaced: true,
            state: {
                data: {},
                errors: {},
                responses: {}
            },
            mutations: {
                SET_DATA: (state, { name, data }) => {
                    Vue.set(state.data, name, data);
                },

                REGISTER: (state, { name }) => {
                    if (__models.hasOwnProperty(name)) {
                        return false;
                    }

                    Vue.set(state.data, name, {});

                    __models[ name ] = __createModel(name);
                },

                RESET: (state, name) => {
                    Vue.delete(state.data, name);
                    Vue.delete(state.errors, name);
                },

                FILL_ERRORS: (state, { name, errors }) => {
                    Vue.set(state.errors, name, errors);
                },

                CLEAR_ERRORS: (state, name) => {
                    Vue.delete(state.errors, name);
                },

                SET_RESPONSE: (state, { name, data }) => {
                    Vue.set(state.responses, name, data);
                }
            },
            actions: {
                register: ({ commit }, payload) => {
                    commit('REGISTER', payload);
                },

                setData: ({ commit }, payload) => {
                    commit('SET_DATA', payload);
                },

                reset: ({ commit }, name) => {
                    commit('RESET', name);
                },

                fillErrors: ({ commit }, { name, errors }) => {
                    commit('FILL_ERRORS', { name, errors });
                },

                clearErrors: ({ commit }, name) => {
                    commit('CLEAR_ERRORS', name);
                },

                setResponse: ({ commit }, payload) => {
                    commit('SET_RESPONSE', payload);
                }
            }
        });
    },
    preload(forms) {
        if (_.isEmpty(forms)) {
            return;
        }

        _.each(forms, ({ data }, name) => {
            __store.dispatch(
                __action('register'),
                { name }
            );

            __store.dispatch(
                __action('setData'),
                { name, data }
            );
        });
    }
};
