import { ReactNode } from 'react';

type Props<T> = {
    query: {
        data?: T,
        isError: boolean,
        isFetching: boolean
    },
    children: (data: NonNullable<T>) => ReactNode,
    errorComponent?: ReactNode
};

export default function QueryDataBoundary<T>(props: Props<T>) {
    if (!props.query.isFetching && props.query.isError) {
        return props.errorComponent ? <>{ props.errorComponent }</> : null;
    }

    if (!props.query.data) {
        return null;
    }

    return (
        <>
            { props.children(props.query.data) }
        </>
    );
}
