import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import areaReducer from "features/area/areaSlice";
import userReducer from "features/user/userSlice";
import { baseApi } from "./api/baseApi";
import errorToastMiddleware from "./middleware/errorToastMiddleware";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    userState: userReducer,
    areaState: areaReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware, errorToastMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
