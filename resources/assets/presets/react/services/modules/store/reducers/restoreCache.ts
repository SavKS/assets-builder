import { AnyAction, Reducer } from '@reduxjs/toolkit';

export default (rootReducer?: Reducer) => (state: Record<string, any> | undefined, action: AnyAction) => {
    return rootReducer ? rootReducer(state, action) : state;
};
