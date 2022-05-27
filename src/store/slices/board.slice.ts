import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import boardListApi from '../services/boardList.service';
import columnApi from '../services/column.service';
import taskApi from '../services/task.service';
import { Board, BoardState, Column, TaskResponse } from './types';

const initialState: BoardState = {};

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    updateActiveBoard(state, action: PayloadAction<Board>) {
      state.board = action.payload;
    },
    updateColumnTasks(state, action: PayloadAction<{ taskList: TaskResponse[]; colId: string }>) {
      const colToUpdate = state.board?.columns.find(
        (col: Column) => col.id === action.payload.colId
      );
      if (colToUpdate) {
        colToUpdate.tasks = action.payload.taskList;
      }
    },
    /*updateTask(state, action: PayloadAction<TaskResponse>) {
      const columnToModify = state.board?.columns.find(
        (col: Column) => col.id === action.payload.columnId
      );
      if (columnToModify) {
        const taskToModify = columnToModify.tasks.find(
          (task: TaskResponse) => task.id === action.payload.id
        );
        if (taskToModify) {
          const newTaskList = [...columnToModify.tasks];
          newTaskList[taskToModify.order - 1] = action.payload;
          console.log('task modified');
          columnToModify.tasks = [...newTaskList];
        } else {
          columnToModify.tasks = [...columnToModify.tasks, action.payload];
        }
      }
    },
    deleteTask(state, action: PayloadAction<TaskResponse>) {
      const columnToModify = state.board?.columns.find(
        (col: Column) => col.id === action.payload.columnId
      );
      if (columnToModify) {
        const taskToModify = columnToModify.tasks.find(
          (task: TaskResponse) => task.id === action.payload.id
        ) as TaskResponse;
        const newTaskList = [...columnToModify.tasks];
        const removed = newTaskList.splice(taskToModify.order - 1, 1);
        columnToModify.tasks = newTaskList;
      }
    },
    */
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      columnApi.endpoints.getColumn.matchFulfilled,
      (state: BoardState, { payload }) => {
        if (!state.board?.columns.find((col: Column) => col.id === payload.id))
          state.board?.columns.push(payload);
      }
    );
    builder.addMatcher(
      boardListApi.endpoints.getBoard.matchFulfilled,
      (state: BoardState, { payload }) => {
        state.board = payload;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.createTask.matchFulfilled,
      (state: BoardState, { payload, meta }) => {
        //[meta.arg.originalArgs.columnId]

        const columnToModify = (state.board as Board).columns.find(
          (col: Column) => col.id === meta.arg.originalArgs.columnId
        ) as Column;
        if (!columnToModify.tasks.find((task: TaskResponse) => task.id === payload.id)) {
          columnToModify.tasks.push(payload);
        }
      }
    );
    builder.addMatcher(
      taskApi.endpoints.updateTask.matchFulfilled,
      (state: BoardState, { payload, meta }) => {
        const columnToModify = state.board?.columns.find(
          (col: Column) => col.id === meta.arg.originalArgs.columnId
        );
        if (columnToModify) {
          const taskToModify = columnToModify.tasks.find(
            (task: TaskResponse) => task.id === payload.id
          ) as TaskResponse;
          const newTaskList = [...columnToModify.tasks];
          newTaskList[taskToModify.order - 1] = payload;
          columnToModify.tasks = newTaskList;
        }
      }
    );
    builder.addMatcher(
      taskApi.endpoints.deleteTask.matchFulfilled,
      (state: BoardState, { payload, meta }) => {
        const columnToModify = state.board?.columns.find(
          (col: Column) => col.id === meta.arg.originalArgs.columnId
        );
        if (columnToModify && columnToModify.tasks) {
          const taskToModify = columnToModify.tasks.find(
            (task: TaskResponse) => task.id === meta.arg.originalArgs.taskId
          ) as TaskResponse;
          const newTaskList: TaskResponse[] = [...columnToModify.tasks];
          const udpdatedTaskList = newTaskList.splice(taskToModify.order - 1, 1);
          columnToModify.tasks = udpdatedTaskList;
        }
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
