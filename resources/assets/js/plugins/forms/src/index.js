import Vue from 'vue';

import _ from 'lodash';
import { deepModel } from 'vue-deepset';
import qs from 'qs';
import wildcard from 'wildcard';
import VForm from './VForm.vue';
import _each from 'lodash/each';

let __store;
let __config = {
    defaultRequestType: 'json',
    paramsSerializer: (params) => qs.stringify(params)
};
let __models = {};
let __forms = function (name) {
};

const preparePostData = (data, dataType = __config.defaultRequestType, fileFields = {}) => {
    if (dataType === 'json') {
        if (_.values(fileFields).length) {
            throw new Error('To send files you need to set "dataType" as "formData"')
        }

        return data;
    }

    const formData = new FormData();

    _.each(fileFields, (files, name) => {
        _.each(files, file => {
            formData.append(name, file, file.name);
        });
    });

    _.each(data, (value, name) => {
        if (_.isArray(value) || _.isPlainObject(value)) {
            _.each(value, (item, key) => {
                formData.append(`${ name }[${ key }]`, item);
            });
        } else {
            formData.append(name, value);
        }
    });

    return formData;
};

const __namespace = () => _.get(__config, 'namespace', 'forms');

const __action = action => __namespace() + '/' + action;

export const extractErrors = (errors, path, asFormatted = false, asSingleMessage = false) => {
    const result = _.reduce(errors, (carry, errors, key) => {
        const regExp = new RegExp(
            path.replace(/\*/g, '[\\w]+').replace(/\./g, '\\.')
        );

        if (regExp.test(key)) {
            const newKey = _.trim(
                key.replace(regExp, ''),
                '.'
            );

            carry[ newKey ] = asFormatted !== false ?
                errors.join(
                    _.isString(asFormatted) ? asFormatted : '. '
                ) :
                errors;
        }

        return carry;
    }, {});

    return asSingleMessage !== false ?
        result.join(
            _.isString(asSingleMessage) ? asSingleMessage : '. '
        ) :
        result;
};

export const pluckErrors = (errors, path, asFormatted = false, asSingleMessage = false) => {
    let result = _.reduce(errors, (carry, errors, key) => {
        const regExp = new RegExp(
            path.replace(/\*/g, '[\\w]+').replace(/\./g, '\\.')
        );

        if (regExp.test(key)) {
            carry.push(
                asFormatted !== false ?
                    errors.join(
                        _.isString(asFormatted) ? asFormatted : '. '
                    ) :
                    errors
            );
        }

        return carry;
    }, []);

    return asSingleMessage ? result.join('. ') : result;
};

const __createModel = name => new Vue({
    data: () => ({
        old: {},
        processing: false,
        files: {}
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
            return deepModel.bind(this)(`${ __namespace() }.data.${ name }`);
        }
    },
    methods: {
        fillFile(event, name) {
            if (!event.target) {
                return;
            }

            const originalName = name = name || event.target.name;

            if (event.target.multiple) {
                name = `${ name }[]`;
            }

            this.$set(
                this.$data,
                'files',
                _.reduce(event.target.files, (carry, file) => {
                    carry[ name ].push(file);

                    return carry;
                }, {
                    ...this.$data.files,

                    [ name ]: []
                })
            );

            if (event.target.multiple) {
                Object.defineProperty(this.$data.files, originalName, {
                    get() {
                        return this[ name ];
                    }
                })
            }
        },

        removeFile(name) {
            this.$delete(this.$data.files, name);
        },

        formatErrors(names, delimiter = '. ') {
            const errors = _.flattenDeep([ names ])
                .map(name => {
                    if (this.errors[ name ]) {
                        return this.errors[ name ];
                    }

                    if (name.includes('*')) {
                        const errors = _.values(
                            wildcard(name, this.errors)
                        );

                        return errors.length ? _.flatten(errors) : null;
                    }

                    return null;
                })
                .filter(value => value);

            if (!errors.length) {
                return null;
            }

            return errors.join(delimiter);
        },

        extractErrors(path, asFormatted = false, asSingleMessage = false) {
            return extractErrors(this.errors, path, asFormatted, asSingleMessage);
        },

        pluckErrors(path, asFormatted = false, asSingleMessage = false) {
            return pluckErrors(this.errors, path, asFormatted, asSingleMessage);
        },

        hasErrors(...names) {
            if (names.length === 0) {
                return !_.isEmpty(this.errors);
            }

            return _.flattenDeep([ names ]).some(
                name => !!this.errors[ name ]
            );
        },

        destroy() {
            return __store.dispatch(__action('destroy'), { name });
        },

        reset(data = {}) {
            this.$set(this.$data, 'files', {});

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
            this.$data.processing = true;

            const formData = JSON.parse(
                JSON.stringify(this.data)
            );

            const data = _.assign(
                {},
                options.filter ? _.pickBy(formData, options.filter) : formData,
                options.data || {}
            );

            const queryParams = options.params || {};
            const http = options.httpClient || __config.httpClient || require('axios');

            let response;

            if (method.toLowerCase() === 'post') {
                response = http[ method ](
                    url,
                    preparePostData(data, options.dataType, this.$data.files),
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

            response.finally(
                () => this.$data.processing = false
            );

            return response;
        },

        clearErrors() {
            return __store.dispatch(__action('clearErrors'), name);
        },

        onChange(callback, config = {}) {
            return this.watch(null, callback, config);
        },

        watch(field = null, callback, config = {}) {
            const path = field !== null ?
                `${ __namespace() }.data.${ name }.${ field }` :
                `${ __namespace() }.data.${ name }`;

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

const __makeFormName = (formName, vm) => {
    if (!_.isString(formName) && !_.isFunction(formName)) {
        throw new Error('Form name must bee String or Function');
    }

    if (_.isString(formName)) {
        return formName;
    }

    return formName.call(vm, vm);
};

const __resolveFormName = (config, vm) => {
    if (typeof config === 'undefined') {
        throw new Error('Form name not defined');
    }

    if (!_.isPlainObject(config)) {
        return __makeFormName(config, vm);
    }

    return __makeFormName(config.current, vm);
};

const __resolveFormNamesForClear = (config, vm) => {
    if (!_.has(config, 'clearable')) {
        return;
    }

    const { clearable } = config;

    if (!clearable) {
        return;
    }

    if (_.isBoolean(clearable)) {
        const name = __makeFormName(config.current, vm);

        return !_.isArray(name) ? [ name ] : name;
    }

    const names = !_.isArray(clearable) ? [ clearable ] : clearable;

    return names.map(
        name => __makeFormName(name, vm)
    );
};

export default {
    forms: (name, data) => __forms(name, data),
    config(config = {}) {
        __config = _.merge({}, __config, config);
    },
    install(Vue) {
        Vue = Vue;

        Vue.component('v-form', VForm);

        __forms = (function (name, data) {
            if (!_.has(__models, name)) {
                __store.dispatch(__action('register'), {
                    name,
                    data
                });
            }

            return __models[ name ];
        }).bind(Vue);

        __forms.extractErrors = extractErrors;

        __forms.pluckErrors = pluckErrors;

        Vue.prototype.$forms = __forms;

        Vue.prototype.$thisForm = function (resource = null) {
            const formName = __resolveFormName(this.$options.form, this);

            return resource !== null ?
                this.$forms(formName)[ resource ] :
                this.$forms(formName);
        };

        Vue.$forms = __forms;

        Vue.mixin({
            destroyed() {
                const formNames = __resolveFormNamesForClear(this.$options.form, this);

                if (_.isUndefined(formNames)) {
                    return;
                }

                formNames.forEach(
                    formName => this.$forms(formName).reset()
                );
            }
        });
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

                DESTROY: (state, { name }) => {
                    if (!__models.hasOwnProperty(name)) {
                        return false;
                    }

                    Vue.delete(state.data, name);

                    delete __models[ name ];
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

                destroy: ({ commit }, payload) => {
                    commit('DESTROY', payload);
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
