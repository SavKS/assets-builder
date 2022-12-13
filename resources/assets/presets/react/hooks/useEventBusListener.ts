import { useEffect } from 'react';

import useService from '@assets-preset/react/hooks/useService';

export default (
    event: string,
    listener: (...args: any[]) => void
) => {
    const eventEmitter = useService('ee');

    useEffect(() => {
        eventEmitter.on(event, listener);

        return () => {
            eventEmitter.off(event, listener);
        };
    }, [ event, eventEmitter, listener ]);
};
