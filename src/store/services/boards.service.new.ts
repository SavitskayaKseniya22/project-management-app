import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessTokenSelector } from '../selectors';
import { BoardNew } from '../slices/types';
import { RootState } from '../store';

export const BOARDS_API_REDUCER_KEY = 'boardsApi';

export const boardsApi = createApi({
  reducerPath: BOARDS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://secure-spire-20211.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessTokenSelector(getState() as RootState);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Board', 'Column', 'Task'],
  endpoints: (builder) => ({
    getBoards: builder.query<BoardNew[], undefined>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
      providesTags: ['Board'],
      transformResponse: (response: { result: BoardNew[] }) => {
        return response.result.map((board) => ({
          ...board,
          columns: board.columns.sort((a, b) => a.order - b.order),
        }));
      },
    }),
    getBoard: builder.query<BoardNew, string | undefined>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'GET',
      }),
      providesTags: ['Board'],
    }),
  }),
});

export const { useGetBoardsQuery, useGetBoardQuery } = boardsApi;

export default boardsApi;
