import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const langReducer = langSlice.reducer;
