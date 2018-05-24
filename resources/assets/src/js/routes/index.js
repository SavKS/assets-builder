import urlHelper from '@plugins/location/url';

const routes = {
    rootUrl: window.App.baseURL,
    routes: [{"uri":"catalog","name":"page.catalog"},{"uri":"search","name":"page.search"},{"uri":"wishlist","name":"page.wishlist"},{"uri":"wishlist\/add\/{param_0}","name":"ajax.wishlist.add"},{"uri":"wishlist\/fetch","name":"ajax.wishlist"},{"uri":"wishlist\/remove\/{param_0}","name":"ajax.wishlist.remove"},{"uri":"compare","name":"page.compare"},{"uri":"compare\/add\/{param_0}","name":"ajax.compare.add"},{"uri":"compare\/fetch","name":"ajax.compare"},{"uri":"compare\/remove\/{param_0}","name":"ajax.compare.remove"},{"uri":"cart","name":"page.cart"},{"uri":"cart\/add\/{param_0}","name":"ajax.cart.add"},{"uri":"cart\/quantity\/{param_0}\/{param_0}","name":"ajax.cart.quantity"},{"uri":"cart\/remove\/{param_0}","name":"ajax.cart.remove"},{"uri":"cart\/clear","name":"ajax.cart.clear"},{"uri":"products\/card\/{param_0}","name":"ajax.product"},{"uri":"checkout","name":"page.checkout"},{"uri":"checkout\/change\/purchase-details","name":"ajax.checkout.change.purchase-details"},{"uri":"checkout\/order\/create","name":"ajax.checkout.order.store"},{"uri":"ajax\/catalog","name":"ajax.catalog"},{"uri":"ajax\/catalog\/search","name":"ajax.catalog.search"},{"uri":"ajax\/catalog\/brands\/{param_0}","name":"ajax.catalog.manufacturer"},{"uri":"ajax\/catalog\/collection\/{param_0}","name":"ajax.catalog.collection"},{"uri":"ajax\/catalog\/categories\/{param_0}\/{param_0?}","name":"ajax.catalog.category"},{"uri":"ajax\/quick-search","name":"ajax.quick-search"},{"uri":"ajax\/novaposhta\/cities","name":"ajax.novaposhta.cities"},{"uri":"ajax\/novaposhta\/departments\/{param_0}","name":"ajax.novaposhta.departments"},{"uri":"ajax\/coupon\/apply","name":"ajax.coupon.apply"},{"uri":"ajax\/coupon\/discard","name":"ajax.coupon.discard"}],
    prefix: '',

    route(name, parameters) {
        const route = this.getByName(name);

        if (!route) {
            return;
        }

        return '/' + urlHelper(route.uri, parameters);
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
                var value = parameters[key];
                delete parameters[key];
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
        for (var key in parameters) {
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
        for (var key in this.routes) {
            if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                return this.routes[key];
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
