import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SigninResponse {
  token: string;
}

export interface Credentials {
  login: string;
  password: string;
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.query<SigninResponse, Credentials>({
      query: (credentials: Credentials) => ({
        url: '/signin',
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const { useSigninQuery } = api;
