import _identity from 'lodash/identity';
import _each from 'lodash/each';
import _merge from 'lodash/merge';

export default class {

    /**
     * @param Object form
     * @param Agent client
     */
    constructor(form, httpClient, resolveErrors) {
        this.form = form;
        this.httpClient = httpClient;
        this.resolveErrors = resolveErrors;
        this.httpConfig = {};

        this.data = {};
    }

    /**
     * @param Object config
     */
    setConfig(config) {
        this.httpConfig = config;
    }

    /**
     * @param Function iteratee
     */
    filter(iteratee) {
        this.iteratee = typeof iteratee !== 'undefined' ?
            iteratee :
            _identity
        ;
    }

    /**
     * @param String name
     * @param String value
     */
    append(name, value) {
        this.data[name] = value;

        return this;
    }

    /**
     * @param String method
     * @param String url
     */
    send(method, url) {
        let request;

        const formData = new FormData;
        const iteratee = typeof this.iteratee === 'function' ?
            this.iteratee :
            null
        ;
        
        _each(_merge({}, this.data, this.form.serialize()), (value, name) => {
            if (iteratee && !iteratee(value, name)) return;

            formData.append(name, value);
        });

        const config = _merge({}, this.config, {
            data: formData
        });

        if (['post', 'put', 'patch'].indexOf(method) !== -1) {
            request = this.httpClient[method](url, {}, config);
        } else {
            request = this.httpClient[method](url, config);
        }

        request.catch((data) => {
            if (data.response.status === 422) {
                resolveErrors(data.response.data);
            }
        });

        return request;
    }
};