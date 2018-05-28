import _merge from 'lodash/merge';
import _reduce from 'lodash/reduce';

import AbstractRequest from './AbstractRequest';

export default class extends AbstractRequest {
    send(url) {
        const iteratee = typeof this.iteratee === 'function' ?
            this.iteratee :
            null
        ;

        const params = _reduce(
            _merge({}, this.data, this.form.serialize()),
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
            _merge({}, this.config, { params })
        );

        request.catch((data) => {
            if (data.response.status === 422) {
                this.resolveErrors(data.response.data);
            }
        });

        return request;
    }
}
