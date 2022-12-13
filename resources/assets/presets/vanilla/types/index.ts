import { AppFunction } from '../app';

declare global {
    interface Window {
        App: {
            apiUrl?: string,
            staticUrl?: string
        },
        __pageData: Record<string, any> | Nil,

        appServices: AppFunction
    }

    const APP_DEBUG: boolean;
}

export type Nil = undefined | null;

