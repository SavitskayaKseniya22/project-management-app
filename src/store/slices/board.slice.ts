import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import boardListApi from '../services/boardList.service';
import { BoardState, Column, TaskResponse } from './types';

const initialState: BoardState = {};

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    updateColumnTasks(state, action: PayloadAction<{ taskList: TaskResponse[]; colId: string }>) {
      const colToUpdate = state.board?.columns.find(
        (col: Column) => col.id === action.payload.colId
      );
      if (colToUpdate) {
        colToUpdate.tasks = action.payload.taskList;
      }
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
