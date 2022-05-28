import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface Profile {
  id: string;
  name: string;
  login: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://secure-spire-20211.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Profile, Profile>({
      query: (profile) => ({
        url: `/users/${profile.id}`,
        method: 'PUT',
        body: profile,
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
