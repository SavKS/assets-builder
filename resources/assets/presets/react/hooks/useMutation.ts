import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRunIfMounted } from '@savks/react-helpers';
import { useMemo } from 'react';

import useEvent from './useEvent';

type WrappedTrigger<Args extends any[]> = (...args: Args) => any;

const noop = () => {
    //
};

type Data<TMutationState extends {
    data?: undefined | any,
    error?: undefined | FetchBaseQueryError | SerializedError,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}> = TMutationState['data'] extends void ? void : Exclude<TMutationState['data'], undefined>;

type TriggerResult<TMutationState extends {
    data?: undefined | any,
    error?: undefined | FetchBaseQueryError | SerializedError,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}> = Promise<{ data: Data<TMutationState> } | { error: NonNullable<TMutationState['error']> }>;

type Trigger<T, TMutationState extends {
    data?: undefined | any,
    error?: undefined | FetchBaseQueryError | SerializedError,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}> = (query: T) => TriggerResult<TMutationState>;

export default <T, TMutationState extends {
    data?: undefined | any,
    error?: undefined | FetchBaseQueryError | SerializedError,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}, Args extends any[]>(
    [ trigger, state ]: (readonly [ Trigger<T, TMutationState>, TMutationState ]),
    handler: (trigger: Trigger<T, TMutationState>, ...args: Args) => TriggerResult<TMutationState>,
    onSuccess?: (data: Data<TMutationState>, args: Args) => void,
    onFail?: (error: NonNullable<TMutationState['error']>, args: Args) => void
) => {
    const runIfMounted = useRunIfMounted();

    const successHandler = useEvent(onSuccess ?? noop);
    const failHandler = useEvent(onFail ?? noop);

    const wrappedTrigger = useEvent(async (...args: Args) => {
        const result = await handler(trigger, ...args);

        runIfMounted(() => {
            if ('error' in result) {
                failHandler?.(result.error, args);
            } else {
                successHandler?.(result.data, args);
            }
        });
    });

    return useMemo<[ WrappedTrigger<Args>, TMutationState ]>(
        () => ([ wrappedTrigger, state ]),
        [ state, wrappedTrigger ]
    );
};
