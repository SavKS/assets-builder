import urlHelper from '@plugins/location/url';

const routes = {
    rootUrl: window.App.baseURL,
    routes: $ROUTES$,
    prefix: '$PREFIX$',

    route(name, parameters, query) {
        const route = this.getByName(name);

        if (!route) {
            return;
        }

        return `/${urlHelper(route.uri, parameters, query)}`;
    },

    url(url, parameters = []) {
        parameters = parameters || [];

        const uri = url + '/' + parameters.join('/');

        return this.getCorrectUrl(uri);
    },

    toRoute(route, parameters) {
        var uri = this.replaceNamedParameters(route.uri, parameters);
        var qs = this.getRouteQueryString(parameters);

        if (this.absolute && this.isOtherHost(route)) {
            return "//" + route.host + "/" + uri + qs;
        }

        return this.getCorrectUrl(uri + qs);
    },

    isOtherHost(route) {
        return route.host && route.host !== window.location.hostname;
    },

    replaceNamedParameters(uri, parameters) {
        return urlHelper(uri, parameters);
    },

    getRouteQueryString: function (parameters) {
        const qs = [];
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                qs.push(key + '=' + parameters[key]);
            }
        }

        if (qs.length < 1) {
            return '';
        }

        return '?' + qs.join('&');
    },

    getByName: function (name) {
        for (const key in this.routes) {
            if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                return this.routes[key];
            }
        }
    }
};

const route = (route, parameters, query) => routes.route(route, parameters, query);
const url = (url, parameters = {}) => routes.url(url, parameters);

export default {
    route,
    url
};
