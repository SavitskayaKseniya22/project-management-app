import { createApi } from '@reduxjs/toolkit/query/react';
import { Column, ColumnRequest, ColumnResponseAll } from '../slices/types';
import fetchBaseQuery from './utils/fetch-base-query';

export const AUTH_API_REDUCER_KEY = 'columnApi';

export const columnApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery,
  tagTypes: ['Column'],
  endpoints: (builder) => ({
    getColumnList: builder.query<ColumnResponseAll[], string | undefined>({
      query: (id: string) => ({
        url: `/${id}/columns`,
        method: 'GET',
      }),
      providesTags: ['Column'],
    }),
    getColumn: builder.query<Column, { id: string; columnId: string }>({
      query: ({ id, columnId }) => ({
        url: `/${id}/columns/${columnId}`,
        method: 'GET',
      }),
      providesTags: ['Column'],
    }),
    createColumn: builder.mutation<ColumnResponseAll, { column: { title: string }; id: string }>({
      query: ({ column, id }) => ({
        url: `/${id}/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['Column'],
    }),
    deleteColumn: builder.mutation<undefined, { id: string; columnId: string }>({
      query: ({ id, columnId }) => ({
        url: `/${id}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Column'],
    }),

    updateColumn: builder.mutation<Column, { column: ColumnRequest; id: string; columnId: string }>(
      {
        query: ({ column, columnId, id }) => ({
          url: `/${id}/columns/${columnId}`,
          method: 'PUT',
          body: column,
        }),
        invalidatesTags: ['Column'],
      }
    ),
  }),
});

export const {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useGetColumnQuery,
  useGetColumnListQuery,
  useUpdateColumnMutation,
} = columnApi;

export default columnApi;
