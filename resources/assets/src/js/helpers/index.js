import classBuilder from './libs/classBuilder';
import closest from './libs/closest';
import http from './libs/http';
import icon from './libs/icon';
import router from '../routes';
import sortByArray from './libs/sortByArray';
import staticAssets from './libs/staticAssets';
import registerStore from './libs/registerStore';
import vMount from './libs/vMount';
import vMountLazy from './libs/vMountLazy';
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
    vMountLazy,
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
