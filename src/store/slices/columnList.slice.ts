import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import columnApi from '../services/column.service';
import { ColumnListState } from './types';

const initialState: ColumnListState = {};

export const columnListSlice = createSlice({
  name: 'columnListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      columnApi.endpoints.getColumnList.matchFulfilled,
      (state: ColumnListState, { payload }) => {
        const payloadCopy = payload.slice();
        payloadCopy.sort(function (a, b) {
          return a.order - b.order;
        });
        state.columnList = payloadCopy;
      }
    );
  },
});

export const columnListReducer = persistReducer(
  {
    key: 'rtk:columnList',
    storage,
    whitelist: ['columnList'],
  },
  columnListSlice.reducer
);
