import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidePageLoadingSelector {
  isLoading: boolean;
}

const initialState: SidePageLoadingSelector = {
  isLoading: false,
};

const sidePageLoadingSelectorSlice = createSlice({
  name: 'sidePageLoadingSelector',
  initialState,
  reducers: {
    setSidePageLoadingSelector: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSidePageLoadingSelector } = sidePageLoadingSelectorSlice.actions;

export default sidePageLoadingSelectorSlice;
