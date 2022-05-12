import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../services';
import { RootState } from '../store';
import { Board, BoardListState, ErrorState } from './types';

const initialState: BoardListState = {};

export const boardListSlice = createSlice({
  name: 'boardListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.boardList.matchFulfilled,
      (state: BoardListState, { payload }) => {
        state.boardList = payload;
      }
    );
  },
});

export const boardListReducer = persistReducer(
  {
    key: 'rtk:boardList',
    storage,
    whitelist: ['boardLsit'],
  },
  boardListSlice.reducer
);
