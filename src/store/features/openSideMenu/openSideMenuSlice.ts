import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpenSideMenuState {
  isOpen: boolean;
}

const initialState: OpenSideMenuState = {
  isOpen: false,
};

const openSideMenuSlice = createSlice({
  name: 'openSideMenu',
  initialState,
  reducers: {
    setIsOpenSideMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpenSideMenu } = openSideMenuSlice.actions;
export default openSideMenuSlice;
