import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISubmitForm } from '../../types/types';

const initialState: { data: ISubmitForm[] } = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ISubmitForm[]>) {
      state.data = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
