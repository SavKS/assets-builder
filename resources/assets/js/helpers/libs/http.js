import axios from 'axios';
import qs from 'qs';
import router from '@routes';

const http  = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    paramsSerializer: params => qs.stringify(params)
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
        case 302:
            document.location.href = error.response.data.redirect_url;
            break;
    }

    return Promise.reject(error);
});

export default http;