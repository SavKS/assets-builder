import urlHelper from '@plugins/location/url';

const routes = {
    rootUrl: window.App.baseURL,
    routes: [],
    prefix: '',

    route(name, parameters) {
        const route = this.getByName(name);

        if (!route) {
            return;
        }

        return `/${urlHelper(route.uri, parameters)}`;
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
        return route.host && route.host != window.location.hostname;
    },

    replaceNamedParameters(uri, parameters) {
        return urlHelper(uri, parameters);

        uri = uri.replace(/\{(.*?)\??\}/g, function (match, key) {
            if (parameters.hasOwnProperty(key)) {
                const value = parameters[ key ];
                delete parameters[ key ];
                return value;
            } else {
                return match;
            }
        });

        // Strip out any optional parameters that were not given
        uri = uri.replace(/\/\{.*?\?\}/g, '');

        return uri;
    },

    getRouteQueryString: function (parameters) {
        var qs = [];
        for (let key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                qs.push(key + '=' + parameters[ key ]);
            }
        }

        if (qs.length < 1) {
            return '';
        }

        return '?' + qs.join('&');
    },

    getByName: function (name) {
        for (let key in this.routes) {
            if (this.routes.hasOwnProperty(key) && this.routes[ key ].name === name) {
                return this.routes[ key ];
            }
        }
    }
};

const route = (route, parameters) => routes.route(route, parameters);
const url = (url, parameters = {}) => routes.url(url, parameters);

export default {
    route,
    url
};
