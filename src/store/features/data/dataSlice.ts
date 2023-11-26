import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../services/types';

interface DataSlice {
  data: ApiResponse | null;
}

const initialState: DataSlice = {
  data: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ApiResponse>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice;
