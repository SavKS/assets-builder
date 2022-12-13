import Application from '@savks/js-container';
import { sprintf } from 'sprintf-js';

export type HTTPMethod = 'get' | 'post' | 'delete';

export type ResponseData = {
    headers: Headers,
    redirected: boolean,
    status: number,
    statusText: string,
    type: ResponseType,
    url: string,
    data: any
};

export const fetchWrapper = async (
    method: HTTPMethod,
    uri: string,
    config?: Pick<RequestInit, 'headers' | 'body'>
): Promise<ResponseData> => {
    const url = uri.match(/^https?:\/\//) ? uri : sprintf(
        '%s/%s',
        window.App?.apiUrl || document.location.origin,
        uri.replace(/^\//, '')
    );

    const response = await fetch(url, {
        headers: {
            ...config?.headers,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },

        body: config?.body ? JSON.stringify(config.body) : undefined,

        // credentials: 'include',
        redirect: 'manual',

        method
    });

    const data = response.headers.get('Content-Type')?.startsWith('application/json') ?
        await response.json() :
        await response.text();

    const result = {
        headers: response.headers,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,

        data
    };

    if (!response.ok) {
        throw result;
    }

    return result;
};

export type ResponseMeta<T = any> = {
    type: string,
    payload: T
};

declare module '@savks/js-container' {
    interface Services {
        'http': typeof fetchWrapper
    }
}

export default {
    register: (app: Application) => {
        app.singleton('http', () => {
            return async (...args: Parameters<typeof fetchWrapper>) => {
                const response = await fetchWrapper(...args);

                if (typeof response.data === 'object') {
                    if (response.data?.meta?.settings) {
                        const settingsStorage = await app.make('settings');

                        settingsStorage.change(data => {
                            Object.entries(response.data.meta.settings).forEach(([ key, value ]) => {
                                data[ key ] = value;
                            });

                            return data;
                        });
                    }

                    if (response.data?.meta?.shared) {
                        const sharedStorage = await app.make('shared');

                        sharedStorage.change(data => {
                            Object.entries(response.data.meta.shared).forEach(([ key, value ]) => {
                                data[ key ] = value;
                            });

                            return data;
                        });
                    }

                    if (response.data?.meta?.custom?.length) {
                        const ee = await app.make('ee');

                        response.data.meta.custom.forEach((meta: ResponseMeta) => {
                            ee.emit(`http.meta@${ meta.type }`, meta.payload);
                        });
                    }
                }

                if (response.data.meta?.redirectUrl) {
                    document.location.href = response.data.meta.redirectUrl;

                    return new Promise(() => {
                        //
                    });
                }

                return response;
            };
        });
    }
};
