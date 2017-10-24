import axios from 'axios';

import parseQuery from 'query-string';

import { LOGIN } from '../../constants/routes';

const http  = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

http.interceptors.request.use((config) => {
    config.headers['X-CSRF-TOKEN'] = window.Laravel.csrfToken;

    return config;
});

http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const query = parseQuery.parse(document.location.search);

    switch (error.response.status) {
        case 301:
            document.location.href = error.response.data.redirect_url;
            break;

        case 401:
            const queryString = parseQuery.stringify({
                back_url: document.location.href,
                ...query
            });

            document.location.href = `${document.location.origin}${LOGIN}?${queryString}`;
            break;
    }

    return Promise.reject(error);
});

export default http;