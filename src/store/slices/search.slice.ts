import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = { searchValue: '' };

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    updateSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;
