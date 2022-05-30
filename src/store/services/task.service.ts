import { createApi } from '@reduxjs/toolkit/query/react';
import { TaskRequest, TaskResponse } from '../slices/types';
import fetchBaseQuery from './utils/fetch-base-query';
export const AUTH_API_REDUCER_KEY = 'taskApi';

export const taskApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery,
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTaskList: builder.query<TaskResponse[], { columnId: string; boardId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    getTask: builder.query<TaskResponse, { taskId: string; columnId: string; boardId: string }>({
      query: ({ taskId, boardId, columnId }) => ({
        url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<
      TaskResponse,
      { task: TaskRequest; boardId: string; columnId: string }
    >({
      query: ({ task, boardId, columnId }) => ({
        url: `/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<undefined, { taskId: string; columnId: string; boardId: string }>({
      query: ({ taskId, columnId, boardId }) => ({
        url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<
      TaskResponse,
      { task: TaskRequest; taskId: string; columnId: string; boardId: string }
    >({
      query: ({ task, taskId, columnId, boardId }) => ({
        url: `/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTaskListQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;

export default taskApi;
