import { createSlice } from '@reduxjs/toolkit';

const preloadSlice = createSlice({
    name: 'preload',
    initialState: {
        resolvedCache: []
    } as {
        resolvedCache: string[]
    },
    reducers: {}
});

export default preloadSlice;
