import { createApi } from '@reduxjs/toolkit/query/react';
import { UserDataModel } from '../../interfaces';
import fetchBaseQuery from './utils/fetch-base-query';

interface ProfileDataModel {
  id: string;
  name: string;
  login: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileDataModel, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<ProfileDataModel, { userId: string; userData: UserDataModel }>({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteProfile: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

const { useGetProfileQuery, useDeleteProfileMutation, useUpdateProfileMutation } = profileApi;

export { useGetProfileQuery, useDeleteProfileMutation, useUpdateProfileMutation };

export default profileApi;
