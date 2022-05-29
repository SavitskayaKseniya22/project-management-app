import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';

function isRootState(obj: unknown): obj is RootState {
  return !!obj && (obj as RootState).auth !== undefined;
}

export default fetchBaseQuery({
  baseUrl: 'https://secure-spire-20211.herokuapp.com',
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    if (isRootState(state)) {
      headers.set('authorization', `Bearer ${state.auth.accessToken}`);
    }

    return headers;
  },
});
