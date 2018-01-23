import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _merge from 'lodash/merge';
import print from 'sprintf-js';

let __config = {};

export default {
    install(Vue) {
        Vue.prototype.$t = function (text, scope) {
            return this.$store.getters['i18n/translate'](text);
        };

        Vue.prototype.$ti = function (text, args, scope) {
            if (!_isArray(args)) {
                throw Error('Arguments must bee array');
            }

            return print.sprintf(
                this.$t(text),
                ...args
            );
        };
    },
    storeRegister(store) {
        store.registerModule('i18n', {
            namespaced: true,
            state: {
                dictionary: _merge(
                    {},
                    _get(__config, 'dictionary', {})
                )
            },
            getters: {
                translate: ({ dictionary }) => (text, locale) => {
                    return _get(dictionary, text, text);
                }
            },
            mutations: {
                setCurrentLocale: (state, Locale) => {
                    state.Locale = Locale;
                }
            },
            actions: {
                changeCurrentLanguage: ({ commit }, Locale) => {
                    commit('setCurrentLocale', Locale)
                }
            }
        })
    },
    config(config = {}) {
        __config = _merge({}, __config, config);
    }
};
