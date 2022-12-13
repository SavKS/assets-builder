import { Middleware, Reducer } from '@reduxjs/toolkit';

export type Api = {
    reducerPath: string,
    reducer: Reducer,
    middleware: Middleware
};

export type ApiResolver = () => Promise<{ default: Api }> | Api;
