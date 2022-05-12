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
    boardList: builder.query<Board[], undefined>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
    }),
    createBoard: builder.query<Board, BoardRequest>({
      query: (board: BoardRequest) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
    }),
  }),
});

export const { useSigninQuery, useSignupQuery, useBoardListQuery } = authApi;

export default authApi;
