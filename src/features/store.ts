import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import layoutReducer from '@/features/layout/layoutSlice';
import userReducer from '@/features/user/userSlice';
import messageReducer from '@/features/message/messageSlice';
import areasReducer from '@/features/areas/areasSlice';
import { baseApi } from './api/baseApi';
import generateReducer from '@/features/generate/generateSlice';
import errorToastMiddleware from './middleware/errorToastMiddleware';
import { chatBaseApi } from './api/chatBaseApi';
import { unsplashtApi } from './api/unsplashApi';
import env from '@/assets/utils/env';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [chatBaseApi.reducerPath]: chatBaseApi.reducer,
    [unsplashtApi.reducerPath]: unsplashtApi.reducer,
    userState: userReducer,
    layoutState: layoutReducer,
    areasState: areasReducer,
    generateState: generateReducer,
    messageState: messageReducer,
  },
  devTools: env === 'development' || env === 'testing',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore layout.content serialization problem
        ignoredPaths: ['layoutState.content', 'layout.setLayoutByArea'],
        ignoredActions: ['layout/setContent', 'layout/setLayoutByArea'],
      },
    }).concat([baseApi.middleware, chatBaseApi.middleware, unsplashtApi.middleware, errorToastMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
