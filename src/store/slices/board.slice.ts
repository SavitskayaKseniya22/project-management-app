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
    updateTask(state, action: PayloadAction<TaskResponse>) {
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      boardListApi.endpoints.getBoard.matchFulfilled,
      (state: BoardState, { payload }) => {
        state.board = payload;
      }
    );
    /*builder.addMatcher(
      taskApi.endpoints.createTask.matchFulfilled,
      (state: BoardState, { payload, meta }) => {
        //[meta.arg.originalArgs.columnId]
        const columnToModify = state.board?.columns.find(
          (col: Column) => col.id === meta.arg.originalArgs.columnId
        );
        if (columnToModify && columnToModify.tasks) {
          console.log('col modifued');
          columnToModify.tasks.push();
        }
      }
    );*/
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
