import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { authApi } from './services';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;
