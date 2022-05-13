import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board, BoardRequest } from '../slices/types';

export const AUTH_API_REDUCER_KEY = 'boardListApi';

export const boardListApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    boardList: builder.query<Board[], undefined>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
    }),
    createBoard: builder.query<Board, BoardRequest>({
      query: (board: BoardRequest) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
    }),
  }),
});

export const { useBoardListQuery, useCreateBoardQuery } = boardListApi;

export default boardListApi;
