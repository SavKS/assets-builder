import { Action, MiddlewareAPI, Reducer, compose } from '@reduxjs/toolkit';
import { Services } from '@savks/js-container';

import { Api } from './types';

export type PreloadedCache = Record<string, any>;

type ChainHandler = (action: Action) => any;
type NextFunction = (action: Action) => any;

export default class Manager {
    #registering: Record<string, Promise<any>> = {};
    #apis: Api[] = [];
    #chain?: ChainHandler;
    #nextFunction?: NextFunction;
    #middlewareApi?: MiddlewareAPI;

    async declareApi(api: Api, storeService: Services['store']) {
        if (Object.hasOwn(this.#registering, api.reducerPath)) {
            return this.#registering[ api.reducerPath ];
        }

        if (!this.has(api)) {
            this.#registering[ api.reducerPath ] = this.register(api, storeService);

            await this.#registering[ api.reducerPath ];

            delete this.#registering[ api.reducerPath ];
        }
    }

    resolved(): Api[];

    resolved(reducerPath: string): Api | undefined;

    resolved(reducerPath?: string) {
        if (reducerPath) {
            return this.#apis.find(api => api.reducerPath === reducerPath);
        }

        return this.#apis;
    }

    has(api: Api | string) {
        return !!this.#apis.find(
            ({ reducerPath }) => reducerPath === (typeof api === 'string' ? api : api.reducerPath)
        );
    }

    async register(api: Api, { injectReducers }: Services['store']) {
        if (this.has(api)) {
            throw new Error(`API with key ${ api.reducerPath } already registered`);
        }

        this.#apis.push(api);

        this.#reRegisterReducers(injectReducers);
        this.#reGenerateChain();
    }

    resolveMiddleware(middlewareApi: MiddlewareAPI) {
        this.#middlewareApi = middlewareApi;

        return (next: NextFunction) => {
            this.#changeNextFunction(next);

            return (action: Action) => {
                if (!this.#chain) {
                    throw new Error('Middlewares chain not defined');
                }

                return this.#chain(action);
            };
        };
    }

    #changeNextFunction(newNext: NextFunction) {
        this.#nextFunction = newNext;

        this.#reGenerateChain();
    }

    #reGenerateChain() {
        if (!this.#middlewareApi) {
            throw new Error('MiddlewareApi not defined');
        }

        const middlewares = this.#apis.map(
            api => api.middleware(this.#middlewareApi!)
        );

        this.#chain = compose<ChainHandler>(...middlewares)(this.#nextFunction);
    }

    #reRegisterReducers(injectReducers: Services['store']['injectReducers']) {
        injectReducers(
            this.#apis.reduce((carry, api) => {
                carry[ api.reducerPath ] = api.reducer;

                return carry;
            }, {} as Record<string, Reducer>)
        );
    }
}
