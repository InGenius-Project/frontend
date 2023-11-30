import {
  Middleware,
  MiddlewareAPI,
  PayloadAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const errorToastMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload.data.Exception) {
        toast.error(action.payload.data.Exception);
      }
    }

    return next(action);
  };

export default errorToastMiddleware;
