import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  SigninQueryRequest,
  SigninQueryResponse,
  SignupQueryRequest,
  SignupQueryResponse,
} from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.query<SigninQueryResponse, SigninQueryRequest | undefined>({
      query: (credentials?: SigninQueryRequest) => {
        if (!credentials || !credentials.login || !credentials.password) {
          throw new Error('Login and password are required');
        }

        return {
          url: '/signin',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    signup: builder.query<SignupQueryResponse, SignupQueryRequest | undefined>({
      query: (userData?: SignupQueryRequest) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useSigninQuery, useSignupQuery } = authApi;

export default authApi;
