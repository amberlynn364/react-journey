import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageLoadingState {
  isLoading: boolean;
}

const initialState: MainPageLoadingState = {
  isLoading: false,
};

const mainPageLoadingSlice = createSlice({
  name: 'mainPageLoading',
  initialState,
  reducers: {
    setIsMainPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsMainPageLoading } = mainPageLoadingSlice.actions;

export default mainPageLoadingSlice;
