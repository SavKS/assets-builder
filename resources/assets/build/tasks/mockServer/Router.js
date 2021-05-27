const lodash = require('lodash');
const db = require('./db');

class Router {
    expressApp;

    constructor(expressApp) {
        this.expressApp = expressApp;
    }

    get(path, callback) {
        return this.match('get', path, callback);
    }

    post(path, callback) {
        return this.match('post', path, callback);
    }

    put(path, callback) {
        return this.match('put', path, callback);
    }

    delete(path, callback) {
        return this.match('delete', path, callback);
    }

    match(method, path, callback) {
        this.expressApp[ method ](path, async (request, response) => {
            let result = callback({
                body: request.body,
                db,
                request,
                response
            });

            if (typeof result.then === 'function') {
                result = await result;
            }

            response.set('Connection', 'close');

            if (lodash.isObject(result) || lodash.isArray(result)) {
                response.json(result);
            } else {
                response.send(
                    result.toString()
                );
            }
        });
    }
};

module.exports = Router;
