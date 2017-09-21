import _get from 'lodash/get';
import _merge from 'lodash/merge';

let __config = {};

export default {
    install(Vue) {
        Vue.prototype.$t = function (text) {
            return this.$store.getters['i18n/translate'](text);
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

// export default function (text) {
//     return text;
// };