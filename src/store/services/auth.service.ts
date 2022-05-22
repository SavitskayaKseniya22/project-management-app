import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board, BoardRequest } from '../slices/types';
import {
  SigninQueryRequest,
  SigninQueryResponse,
  SignupQueryRequest,
  SignupQueryResponse,
} from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://secure-spire-20211.herokuapp.com',
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
