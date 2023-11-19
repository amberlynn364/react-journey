import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import searchValueSlice from './features/searchValue/searchValueSlice';
import dataSlice from './features/data/dataSlice';
import itemsPerPageSlice from './features/itemsPerPage/itemsPerPageSlice';
import pokemonApi from './features/pokemonApi/pokemonApi';
import mainPageLoadingSlice from './features/mainPageLoading/mainPageLoadingSlice';
import sidePageLoadingSlice from './features/sidePageLoading/sidePageLoadingSlice';
import openSideMenuSlice from './features/openSideMenu/openSideMenuSlice';

export const store = configureStore({
  reducer: {
    searchValue: searchValueSlice.reducer,
    data: dataSlice.reducer,
    itemsPerPage: itemsPerPageSlice.reducer,
    mainPageLoading: mainPageLoadingSlice.reducer,
    sidePageLoading: sidePageLoadingSlice.reducer,
    openSideMenu: openSideMenuSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.dispatch>;
// export type AppDispatch = AppStore['dispatch']

export type AppDispatch = typeof store.dispatch;
