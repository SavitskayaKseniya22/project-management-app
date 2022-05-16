import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessTokenSelector } from '../selectors';
import { Board, BoardRequest } from '../slices/types';
import { RootState } from '../store';

export const AUTH_API_REDUCER_KEY = 'boardListApi';

export const boardListApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://damp-savannah-46887.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessTokenSelector(getState() as RootState);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    boardList: builder.query<Board[], undefined>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
      providesTags: ['Board'],
    }),
    createBoard: builder.mutation<Board, BoardRequest | undefined>({
      query: (board: BoardRequest) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: builder.mutation<undefined, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});

export const { useBoardListQuery, useCreateBoardMutation, useDeleteBoardMutation } = boardListApi;

export default boardListApi;
