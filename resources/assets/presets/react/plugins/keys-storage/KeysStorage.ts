import { ObjectStorage } from '@assets-preset/react/plugins/object-storage/ObjectStorage';

export default class KeysStorage {
    readonly #storage: ObjectStorage<{ keys: string[] }>;
    readonly #limit: number | undefined;

    constructor(localStorageKey: string, limit?: number) {
        const state = localStorage.getItem(localStorageKey);

        this.#storage = new ObjectStorage<{ keys: string[] }>(
            state ? JSON.parse(state) : { keys: [] }
        );

        this.#limit = limit;

        this.#storage.subscribe(data => {
            localStorage.setItem(
                localStorageKey,
                JSON.stringify(data)
            );
        });
    }

    get storage() {
        return this.#storage;
    }

    get keys() {
        return this.#storage.data.keys;
    }

    add(productId: string) {
        this.#storage.change(storage => {
            if (!storage.keys.includes(productId)) {
                storage.keys.unshift(productId);
            }

            if (this.#limit && storage.keys.length > this.#limit) {
                storage.keys.splice(this.#limit - 1);
            }
        });
    }

    remove(productId: string) {
        this.#storage.change(storage => {
            const index = storage.keys.indexOf(productId);

            if (index !== -1) {
                storage.keys.splice(index, 1);
            }
        });
    }

    toggle(productId: string) {
        if (this.has(productId)) {
            this.remove(productId);
        } else {
            this.add(productId);
        }
    }

    has(productId: string) {
        return this.#storage.data.keys.indexOf(productId) !== -1;
    }

    onChange(
        handler: (keys: string[]) => void,
        immediate = false
    ): () => void {
        return this.#storage.subscribe(keys => {
            handler(keys);
        }, {
            immediate,
            path: 'keys'
        });
    }
}
