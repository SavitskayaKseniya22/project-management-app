import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { unauthenticatedMiddleware } from './middlewares/authenticatedMiddleware';
import { authApi } from './services';
import boardListApi from './services/boardList.service';
import { authReducer, authSlice, errorReducer, errorSlice } from './slices';
import { boardListReducer, boardListSlice } from './slices/boardList.slice';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [boardListApi.reducerPath]: boardListApi.reducer,
  [authSlice.name]: authReducer,
  [errorSlice.name]: errorReducer,
  [boardListSlice.name]: boardListReducer,
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
    }).concat([unauthenticatedMiddleware, authApi.middleware, boardListApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
