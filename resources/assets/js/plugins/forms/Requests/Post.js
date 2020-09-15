import _ from 'lodash';

import AbstractRequest from './AbstractRequest';

export default class extends AbstractRequest {
    constructor(form, httpClient, resolveErrors) {
        super(form, httpClient, resolveErrors);

        this.method = 'post';
    }

    setMethod(method) {
        this.method = method;
    }

    send(url) {
        const iteratee = typeof this.iteratee === 'function' ?
            this.iteratee :
            null
        ;

        const formData = _.reduce(
            _.merge({}, this.data, this.form.serialize()),
            (carry, value, name) => {
                if (iteratee && !iteratee(value, name)) {
                    return;
                }

                carry.append(name, value);

                return carry;
            },
            new FormData
        );

        const request = this.httpClient(
            _.merge({}, this.config, {
                url,
                method: this.method,
                data: formData
            })
        );

        request.catch((data) => {
            if (data.response.status === 422) {
                this.resolveErrors(data.response.data);
            }
        });

        return request;
    }
}
