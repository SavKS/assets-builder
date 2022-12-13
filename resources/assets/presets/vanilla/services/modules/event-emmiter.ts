import Application from '@savks/js-container';
import type EventEmitter from 'eventemitter3';

declare module '@savks/js-container' {
    interface Services {
        'ee': EventEmitter
    }
}

export default {
    register: (app: Application) => {
        app.singleton('ee', async () => {
            const { default: EventEmitter } = await import('eventemitter3');

            return new EventEmitter();
        });
    }
};
