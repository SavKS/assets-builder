import arrayHelpers from './libs/arrayHelpers';
import asset from './libs/asset';
import ee from './libs/eventEmitter';
import http from './libs/http';
import icon from './libs/icon';
import registerStore from './libs/registerStore';
import router from '../routes';
import vMount from './libs/vMount';
import vMountLazy from './libs/vMountLazy';
import vReplace from './libs/vReplace';

export {
    arrayHelpers,
    asset,
    http,
    registerStore,
    router,
    vMount,
    vMountLazy,
    vReplace
};

export const install = {
    install(Vue) {
        Vue.prototype.$helpers = {
            arrayHelpers,
            asset,
            http,
            icon,
            router
        };

        Vue.prototype.$ee = ee;
    }
};
