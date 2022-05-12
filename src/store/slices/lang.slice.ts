import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LangState } from './types';

const initialState: LangState = { lang: 'ENGLISH' };

export const langSlice = createSlice({
  name: 'langSlice',
  initialState,
  reducers: {
    updateLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});

export const langReducer = persistReducer(
  {
    key: 'rtk:lang',
    storage,
    whitelist: ['lang'],
  },
  langSlice.reducer
);
