import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface AuthState {
  accessToken?: string;
}

export interface ErrorState {
  error?: FetchBaseQueryError | SerializedError | null;
}
