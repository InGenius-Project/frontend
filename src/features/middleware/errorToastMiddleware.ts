import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ResponseDTO } from "types/DTO/ResponseDTO";

const errorToastMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === "FETCH_ERROR") {
        toast.error("伺服器未回應");
        return next(action);
      }
      const error = action.payload.data as ResponseDTO<any>;

      if (error.isError && error.responseException) {
        if (error.statusCode === 500) {
          toast.error("伺服器錯誤");
        } else if (error.statusCode !== 401) {
          toast.error(error.responseException.exceptionMessage);
        }
        return next(action);
      }
    }

    return next(action);
  };

export default errorToastMiddleware;
