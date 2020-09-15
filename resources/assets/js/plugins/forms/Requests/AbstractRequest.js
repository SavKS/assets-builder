import _ from 'lodash';

export default class {
    /**
     * @param Object form
     * @param Agent client
     */
    constructor(form, httpClient, resolveErrors) {
        this.form = form;
        this.httpClient = httpClient;
        this.resolveErrors = resolveErrors;

        this.data = {};
    }

    /**
     * @param Object data
     */
    setData(data) {
        this.data = data;
    }

    /**
     * @param Function iteratee
     */
    filter(iteratee) {
        this.iteratee = typeof iteratee !== 'undefined' ?
            iteratee :
            _.identity
        ;
    }

    /**
     * @param String name
     * @param String value
     */
    append(name, value) {
        this.data[ name ] = value;

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

        _.each(_.merge({}, this.data, this.form.serialize()), (value, name) => {
            if (iteratee && !iteratee(value, name)) {
                return;
            }

            formData.append(name, value);
        });

        const config = _.merge({}, this.config, {
            data: formData
        });

        if ([ 'post', 'put', 'patch' ].indexOf(method) !== -1) {
            request = this.httpClient[ method ](url, {}, config);
        } else {
            request = this.httpClient[ method ](url, config);
        }

        request.catch((data) => {
            if (data.response.status === 422) {
                this.resolveErrors(data.response.data);
            }
        });

        return request;
    }
};
