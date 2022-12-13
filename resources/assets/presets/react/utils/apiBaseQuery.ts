import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import set from '@savks/not-need-lodash/set';
import { Form } from '@savks/react-forms';
import trim from 'lodash/trim';
import { stringify } from 'qs';

import { PRELOADED_CONTENT } from '../constants';
import { HTTPMethod } from '../services/modules/http';

export type ApiBaseQueryError = {
    status?: number,
    message?: string,
    meta?: {
        response?: {
            data: any | undefined,
            statusCode: number | undefined,
            original: Response | undefined
        }
    }
};

export type ApiBaseQuery = {
    url: string,
    method: HTTPMethod,
    data?: any | Form,
    params?: Record<string, any>,
    config?: {
        headers?: HeadersInit
    },
    preloadKey?: string
};

export type ApiBaseQueryFn = BaseQueryFn<ApiBaseQuery, any, ApiBaseQueryError>;

const resolveFromServer = async (baseUrl: string | undefined, {
    url,
    method,
    data,
    config = {},
    params
}: ApiBaseQuery) => {
    const isForm = data instanceof Form;

    try {
        if (isForm) {
            data.markAsProcessing();
        }

        if ([ 'post', 'delete' ].includes(method.toLowerCase())) {
            const headers = config.headers ?? {};

            set(
                headers,
                'X-CSRF-TOKEN',
                await csrfToken()
            );

            config.headers = headers;
        }

        let queryParams: Record<string, any> | undefined;
        let body: Record<string, any> | undefined;

        if (method.toLowerCase() === 'get') {
            queryParams = data;
            body = undefined;
        } else {
            queryParams = params;
            body = isForm ? data.requestData() : data;
        }

        const query = stringify(queryParams, { addQueryPrefix: true });

        const http = await require('@assets-preset/react/app').default('http');

        const result = await http(
            method,
            `${ baseUrl ? `${ baseUrl }/` : '' }${ trim(url, '/') }${ query }`,
            {
                body,

                ...config
            }
        );

        if (isForm) {
            data.clearErrors();
        }

        return {
            data: {
                ...result.data.data,

                [ PRELOADED_CONTENT ]: false
            }
        };
    } catch (httpError) {
        const err = httpError as any;

        if (isForm && err.status === 422) {
            data.setErrors(err.data.errors);
        }

        if (APP_DEBUG) {
            // eslint-disable-next-line no-console
            console.error('HTTP Error', err);
        }

        return {
            error: {
                status: err.status,
                message: err.statusText,
                meta: {
                    response: {
                        data: err.data,
                        statusCode: err.status
                    }
                }
            }
        };
    } finally {
        if (isForm) {
            data.removeProcessingMark();
        }
    }
};

const apiBaseQuery = (baseUrl?: string): ApiBaseQueryFn => ({ preloadKey, ...args }) => {
    if (preloadKey && window.__preload.cache?.[ preloadKey ]) {
        const result = {
            data: {
                ...window.__preload.cache?.[ preloadKey ],

                [ PRELOADED_CONTENT ]: true
            }
        };

        delete window.__preload.cache?.[ preloadKey ];

        return result;
    }

    return resolveFromServer(baseUrl, args);
};

export default apiBaseQuery;

async function csrfToken() {
    const http = await require('@assets-preset/react/app').default('http');

    const { data } = await http('get', 'api/state/csrf-token');

    return data.data.value;
}
