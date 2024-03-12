import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import layoutReducer from '@/features/layout/layoutSlice';
import userReducer from '@/features/user/userSlice';
import areasReducer from '@/features/areas/areasSlice';
import { baseApi } from './api/baseApi';
import errorToastMiddleware from './middleware/errorToastMiddleware';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    userState: userReducer,
    layoutState: layoutReducer,
    areasState: areasReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore layout.content serialization problem
        ignoredPaths: ['layoutState.content'],
        ignoredActions: ['layout/setContent'],
      },
    }).concat([baseApi.middleware, errorToastMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
