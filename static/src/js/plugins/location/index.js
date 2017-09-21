import url from './libs/url';
import _assign from 'lodash/assign';

class Location {
    constructor(routes = {}) {
        this.routes = routes;

        const self = this;
    }

    bulkRegister(routes) {
        this.routes = _assign(this.routes, routes);
    }

    register(route, url) {
        this.routes[route] = url;
    }

    to(route, params) {
        this.__assertRoute(route);

        document.location.href = this.url(route, params);
    }

    url(route, params) {
        this.__assertRoute(route);

        const prefix = window.Laravel.currentLanguage !== window.Laravel.fallbackLanguage ?
            `/${window.Laravel.currentLanguage}` :
            '';
        
        return `${prefix}${url(this.routes[route], params)}`;
    }

    list() {
        return this.routes;
    }

    install(Vue) {
        Vue.prototype.$location = this;
    }

    __assertRoute(route) {
        if (!this.routes.hasOwnProperty(route)) {
            throw Error(`Route [${route}] not found`);
        }
    }
}

export default Location;