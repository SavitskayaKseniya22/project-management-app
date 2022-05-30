import { createSlice } from '@reduxjs/toolkit';
import taskApi from '../services/task.service';
import { TaskResponse } from './types';

export interface TaskListState {
  [id: string]: {
    [id: string]: TaskResponse[];
  };
}

const initialState: TaskListState = {};

export const taskListSlice = createSlice({
  name: 'taskListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      taskApi.endpoints.getTaskList.matchFulfilled,
      (state: TaskListState, { payload, meta }) => {
        const boardId = meta.arg.originalArgs.boardId;
        const columnId = meta.arg.originalArgs.columnId;
        const payloadCopy = payload.slice();
        payloadCopy.sort(function (a, b) {
          return a.order - b.order;
        });
        const board = {
          [boardId]: {
            [columnId]: payloadCopy,
          },
        };

        Object.assign(state, board);
      }
    );
  },
});
