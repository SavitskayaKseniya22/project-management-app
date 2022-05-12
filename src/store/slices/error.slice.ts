import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ErrorState } from './types';

const initialState: ErrorState = {};

export const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    updateError: (state, action: PayloadAction<FetchBaseQueryError | SerializedError | null>) => {
      state.error = action.payload;
    },
  },
});

export const errorReducer = persistReducer(
  {
    key: 'rtk:err',
    storage,
    whitelist: ['error'],
  },
  errorSlice.reducer
);
