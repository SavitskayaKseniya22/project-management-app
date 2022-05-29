import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { profileRehydrateMiddleware, unauthenticatedMiddleware } from './middlewares';
import { authApi } from './services';
import boardListApi from './services/boardList.service';
import columnApi from './services/column.service';
import taskApi from './services/task.service';
import { authReducer, authSlice, errorReducer, errorSlice } from './slices';

import { profileSlice, profileReducer } from './slices';
import { boardSlice } from './slices/board.slice';
import { boardListSlice } from './slices/boardList.slice';
import { columnListSlice } from './slices/columnList.slice';
import { searchSlice, searchReducer } from './slices/search.slice';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [boardListApi.reducerPath]: boardListApi.reducer,
  [columnApi.reducerPath]: columnApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [authSlice.name]: authReducer,
  [errorSlice.name]: errorReducer,
  [boardListSlice.name]: boardListSlice.reducer,
  [searchSlice.name]: searchReducer,
  [profileSlice.name]: profileReducer,
  [boardSlice.name]: boardSlice.reducer,
  [columnListSlice.name]: columnListSlice.reducer,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      unauthenticatedMiddleware,
      profileRehydrateMiddleware,
      authApi.middleware,
      boardListApi.middleware,
      authApi.middleware,
      boardListApi.middleware,
      columnApi.middleware,
      taskApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
