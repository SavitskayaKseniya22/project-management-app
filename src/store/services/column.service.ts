import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Column, ColumnRequest, ColumnResponseAll } from '../slices/types';
import { RootState } from '../store';

export const AUTH_API_REDUCER_KEY = 'columnApi';

export const columnApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://damp-savannah-46887.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Column'],
  endpoints: (builder) => ({
    getColumnList: builder.query<ColumnResponseAll[], string | undefined>({
      query: (id: string) => ({
        url: `/boards/${id}/columns`,
        method: 'GET',
      }),
      providesTags: ['Column'],
    }),
    getColumn: builder.query<Column, { id: string; columnId: string }>({
      query: ({ id, columnId }) => ({
        url: `/boards/${id}/columns/${columnId}`,
        method: 'GET',
      }),
      providesTags: ['Column'],
    }),
    createColumn: builder.mutation<ColumnResponseAll, { column: ColumnRequest; id: string }>({
      query: ({ column, id }) => ({
        url: `/boards/${id}/columns`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['Column'],
    }),
    deleteColumn: builder.mutation<undefined, { id: string; columnId: string }>({
      query: ({ id, columnId }) => ({
        url: `/boards/${id}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Column'],
    }),

    updateColumn: builder.mutation<Column, { column: ColumnRequest; id: string; columnId: string }>(
      {
        query: ({ column, columnId, id }) => ({
          url: `/boards/${id}/columns/${columnId}`,
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
