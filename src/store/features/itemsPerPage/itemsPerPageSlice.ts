import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemsPerPageState {
  itemsPerPage: string;
}

const initialState: ItemsPerPageState = {
  itemsPerPage: '10',
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;

export default itemsPerPageSlice;
