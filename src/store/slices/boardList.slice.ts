import { createSlice } from '@reduxjs/toolkit';
import boardListApi from '../services/boardList.service';
import { BoardListState } from './types';

const initialState: BoardListState = {};

export const boardListSlice = createSlice({
  name: 'boardListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      boardListApi.endpoints.boardList.matchFulfilled,
      (state: BoardListState, { payload }) => {
        state.boardList = payload;
      }
    );
  },
});

export const boardListReducer = boardListSlice.reducer;
