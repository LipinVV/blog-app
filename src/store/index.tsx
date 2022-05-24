import {configureStore} from '@reduxjs/toolkit';
import {usersSlice} from "../reducers/usersSlice";

export const store = configureStore({
    reducer: usersSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;