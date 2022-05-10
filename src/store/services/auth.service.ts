import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninQueryRequest, SigninQueryResponse, SignupQueryRequest } from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.query<SigninQueryResponse, SigninQueryRequest>({
      query: (credentials: SigninQueryRequest) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.query<SigninQueryResponse, SignupQueryRequest>({
      query: (userData: SignupQueryRequest) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSigninQuery, useSignupQuery } = authApi;

export default authApi;
