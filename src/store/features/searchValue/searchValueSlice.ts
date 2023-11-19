import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import localStorageSerive from '../../../utils/localStorageService';

interface SearchValueState {
  searchValue: string;
}

const initialState: SearchValueState = {
  searchValue: localStorageSerive.get('searchValue') || '',
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export default searchValueSlice;
