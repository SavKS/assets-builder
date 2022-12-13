import { AppFunction } from '../app';
import { PreloadedCache } from '../plugins/api/Manager';

declare global {
    interface Window {
        App: {
            apiUrl?: string,
            staticUrl?: string
        },
        __preload: {
            cache: PreloadedCache | Nil,
            state: Record<string, any> | Nil,
            settings: Record<string, any> | Nil,
            shared: Record<string, any> | Nil,
            formData: Record<string, any> | Nil
        },
        __pageData: Record<string, any> | Nil,

        appServices: AppFunction
    }

    const APP_DEBUG: boolean;
}

export type Nil = undefined | null;

export type DTOEnum<Enum> = {
    value: Enum,
    description: string
};

export type SvgObject = {
    attributes: Record<string, string>,
    content: string
};

export type SelectOption = {
    value: string,
    label: string
};

