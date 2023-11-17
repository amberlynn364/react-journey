import { configureStore } from '@reduxjs/toolkit';
import searchValueSlice from './features/searchValue/searchValueSlice';
import dataSlice from './features/data/dataSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchValueSlice.reducer,
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
