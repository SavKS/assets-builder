import axios from 'axios';

import qs from 'qs';
import router from '@routes';

const http  = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

http.interceptors.request.use((config) => {
    if (window.App.csrfToken && config.method === 'post') {
        config.headers['X-CSRF-TOKEN'] = window.App.csrfToken;
    }

    return config;
});

http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const query = qs.parse(document.location.search);

    switch (error.response.status) {
        case 301:
            document.location.href = error.response.data.redirect_url;
            break;

        case 401:
            const queryString = qs.stringify({
                back_url: document.location.href,
                ...query
            });

            document.location.href = router.route('page.auth.login');
            break;
    }

    return Promise.reject(error);
});

export default http;
