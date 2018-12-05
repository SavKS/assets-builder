import ee from './libs/eventEmitter';
import http from './libs/http';
import icon from './libs/icon';
import registerStore from './libs/registerStore';
import router from '../routes';
import staticAssets from './libs/staticAssets';
import vMount from './libs/vMount';
import vMountLazy from './libs/vMountLazy';
import vReplace from './libs/vReplace';

export {
    http,
    router,
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
            http,
            router,
            staticAssets
        };

        Vue.prototype.$ee = ee;
    }
};
