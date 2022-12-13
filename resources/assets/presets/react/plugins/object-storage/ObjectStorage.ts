import get from '@savks/not-need-lodash/get';
import { produce } from 'immer';
import { Get } from 'type-fest';

type Subscriber<T = any> = {
    path: string | undefined,
    listener: (value: T) => void
};

export type Storage = Record<string | number | symbol, any>;

export class ObjectStorage<T extends Storage = Storage> {
    #prevData: T;
    #data: T;
    #subscribers: Subscriber[] = [];

    constructor(initialData: T) {
        this.#data = this.#prevData = initialData;
    }

    get data() {
        return this.#data;
    }

    change(handler: (storage: T) => void) {
        this.#prevData = this.#data;
        this.#data = produce(this.#data, handler);

        this.#trigger();
    }

    #trigger() {
        this.#subscribers.forEach(subscriber => {
            if (subscriber.path) {
                const prevValue = get(this.#prevData, subscriber.path);
                const currentValue = get(this.#data, subscriber.path);

                if (prevValue !== currentValue) {
                    subscriber.listener(currentValue);
                }
            } else {
                if (this.#prevData !== this.#data) {
                    subscriber.listener(this.#data);
                }
            }
        });
    }

    subscribe(listener: Subscriber<T>['listener'], opts?: {
        immediate?: boolean,
        path?: undefined
    }): () => void;

    subscribe<P extends string>(listener: Subscriber<Get<T, P>>['listener'], opts: {
        immediate?: boolean,
        path: P
    }): () => void;

    subscribe(listener: Subscriber<T>['listener'], opts?: {
        immediate?: boolean,
        path?: string
    }) {
        this.#subscribers.push({
            path: opts?.path,
            listener
        });

        if (opts?.immediate) {
            listener(
                opts?.path ?
                    get(this.#data, opts?.path) :
                    this.#data
            );
        }

        return () => {
            this.#subscribers = this.#subscribers.filter(
                subscriber => subscriber.listener !== listener
            );
        };
    }
}
