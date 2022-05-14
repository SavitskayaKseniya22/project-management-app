import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board, BoardRequest } from '../slices/types';
import { RootState } from '../store';
import { BoardListRequest } from './types';

export const AUTH_API_REDUCER_KEY = 'boardListApi';

export const boardListApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://damp-savannah-46887.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    boardList: builder.query<Board[], undefined>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
    }),
    createBoard: builder.query<Board, BoardRequest | undefined>({
      query: (board: BoardRequest) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
    }),
    deleteBoard: builder.mutation<undefined, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useBoardListQuery, useCreateBoardQuery, useDeleteBoardMutation } = boardListApi;

export default boardListApi;
