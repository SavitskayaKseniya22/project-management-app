import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { profileRehydrateMiddleware, unauthenticatedMiddleware } from './middlewares';
import { authApi } from './services';
import boardListApi from './services/boardList.service';
import columnApi from './services/column.service';
import { authReducer, authSlice, errorReducer, errorSlice } from './slices';
import { boardReducer, boardSlice } from './slices/board.slice';
import { boardListReducer, boardListSlice } from './slices/boardList.slice';
import { columnListReducer, columnListSlice } from './slices/columnList.slice';
import { langReducer, langSlice } from './slices/lang.slice';
import { profileSlice, profileReducer } from './slices';
import { searchSlice, searchReducer } from './slices/search.slice';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [boardListApi.reducerPath]: boardListApi.reducer,
  [columnApi.reducerPath]: columnApi.reducer,
  [authSlice.name]: authReducer,
  [errorSlice.name]: errorReducer,
  [boardListSlice.name]: boardListReducer,
  [langSlice.name]: langReducer,
  [searchSlice.name]: searchReducer,
  [profileSlice.name]: profileReducer,
  [boardSlice.name]: boardReducer,
  [columnListSlice.name]: columnListReducer,
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
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
