import { useEffect, useState } from 'react';

export default <T>(callback: () => Promise<T>, skip = false) => {
    const [ result, setResult ] = useState<T>();

    useEffect(() => {
        if (skip) {
            setResult(undefined);

            return;
        }

        const promise = callback();

        let ignore = false;

        promise.then(result => {
            if (ignore) {
                return;
            }

            setResult(result);
        });

        return () => {
            ignore = true;
        };
    }, [ callback, skip ]);

    return result;
};
