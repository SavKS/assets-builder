import { createApi } from '@reduxjs/toolkit/query/react';

import { SelectOption } from '@assets-preset/react/types';
import apiBaseQuery from '@assets-preset/react/utils/apiBaseQuery';

const autocompleteApi = createApi({
    reducerPath: 'autocomplete',
    baseQuery: apiBaseQuery(),
    refetchOnMountOrArgChange: true,
    endpoints: build => ({
        list: build.query<{ items: SelectOption }, {
            url: string,
            term: string
        }>({
            query: ({ url, term }) => ({
                url,
                method: 'get',
                data: { term }
            })
        })
    })
});

export default autocompleteApi;
