import arrayHelpers from './libs/arrayHelpers';
import asset from './libs/asset';
import staticAsset from './libs/staticAsset';
import eventEmitter from './libs/eventEmitter';
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
    staticAsset,
    http,
    registerStore,
    router,
    vMount,
    vMountLazy,
    vReplace,
    eventEmitter
};

export const install = {
    install(Vue) {
        Vue.prototype.$helpers = {
            arrayHelpers,
            asset,
            staticAsset,
            http,
            icon,
            router
        };

        Vue.prototype.$ee = eventEmitter;
    }
};
