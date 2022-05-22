import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board, BoardRequest } from '../slices/types';
import { RootState } from '../store';

export const AUTH_API_REDUCER_KEY = 'boardListApi';

export const boardListApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://secure-spire-20211.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.accessToken;
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
    getBoard: builder.query<Board, string | undefined>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'GET',
      }),
      providesTags: ['Board'],
    }),
  }),
});

export const {
  useBoardListQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardQuery,
} = boardListApi;

export default boardListApi;
