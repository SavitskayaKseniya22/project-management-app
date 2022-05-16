import { Middleware } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { updateUserNameActionCreator } from '../slices';
import jwt_decode from 'jwt-decode';

const profileRehydrateMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === REHYDRATE && action.payload?.accessToken) {
      dispatch(
        updateUserNameActionCreator(jwt_decode<{ login: string }>(action.payload.accessToken).login)
      );
    }

    return next(action);
  };

export default profileRehydrateMiddleware;
