import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import boardListApi from '../services/boardList.service';
import { Board, BoardState } from './types';

const initialState: BoardState = {};

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    updateActiveBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      boardListApi.endpoints.getBoard.matchFulfilled,
      (state: BoardState, { payload }) => {
        state.board = payload;
      }
    );
  },
});

export const boardReducer = persistReducer(
  {
    key: 'rtk:board',
    storage,
    whitelist: ['board'],
  },
  boardSlice.reducer
);
