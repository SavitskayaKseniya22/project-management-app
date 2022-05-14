import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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

export const searchReducer = persistReducer(
  {
    key: 'rtk:searchValue',
    storage,
    whitelist: ['searchValue'],
  },
  searchSlice.reducer
);
