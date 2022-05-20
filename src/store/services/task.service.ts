import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskRequest, TaskResponse } from '../slices/types';
import { RootState } from '../store';

export const AUTH_API_REDUCER_KEY = 'taskApi';

export const taskApi = createApi({
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
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    createTask: builder.mutation<
      TaskResponse,
      { task: TaskRequest; boardId: string; columnId: string }
    >({
      query: ({ task, boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<undefined, { taskId: string; boardId: string; columnId: string }>({
      query: ({ taskId, boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<
      TaskResponse,
      { task: TaskRequest; taskId: string; boardId: string; columnId: string }
    >({
      query: ({ task, taskId, columnId, boardId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;

export default taskApi;
