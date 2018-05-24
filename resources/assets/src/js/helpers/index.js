import classBuilder from './libs/classBuilder';
import closest from './libs/closest';
import http from './libs/http';
import icon from './libs/icon';
import router from '../routes';
import sortByArray from './libs/sortByArray';
import staticAssets from './libs/staticAssets';
import registerStore from './libs/registerStore';
import vMount from './libs/vMount';
import vReplace from './libs/vReplace';

export {
    classBuilder,
    closest,
    http,
    router,
    sortByArray,
    staticAssets,
    registerStore,
    vMount,
    vReplace
};

export const install = {
    install(Vue) {
        Vue.prototype.$helpers = {
            icon,
            classBuilder,
            closest,
            http,
            router,
            sortByArray,
            staticAssets
        };
    }
};
