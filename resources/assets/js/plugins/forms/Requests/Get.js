import _ from 'lodash';

import AbstractRequest from './AbstractRequest';

export default class extends AbstractRequest {
    send(url) {
        const iteratee = typeof this.iteratee === 'function' ?
            this.iteratee :
            null;

        const params = _.reduce(
            _.merge({}, this.data, this.form.serialize()),
            (carry, value, name) => {
                if (iteratee && !iteratee(value, name)) {
                    return;
                }

                carry[ name ] = value;

                return carry;
            },
            {}
        );

        const request = this.httpClient.get(
            url,
            _.merge({}, this.config, { params })
        );

        request.catch((data) => {
            if (data.response.status === 422) {
                this.resolveErrors(data.response.data);
            }
        });

        return request;
    }
}
