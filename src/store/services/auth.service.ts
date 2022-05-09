import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SigninResponse {
  token: string;
}

export interface SigninQuery {
  login: string;
  password: string;
}

export interface SignupQuery extends SigninQuery {
  name: string;
}

const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.query<SigninResponse, SigninQuery>({
      query: (credentials: SigninQuery) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.query<SigninResponse, SignupQuery>({
      query: (credentials: SignupQuery) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSigninQuery, useSignupQuery } = authApi;

export default authApi;
