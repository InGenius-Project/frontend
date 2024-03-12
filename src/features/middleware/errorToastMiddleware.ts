import { IResponse } from '@/types/interfaces/IResponse';
import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorToastMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      toast.error('伺服器未回應');
      return next(action);
    }
    const error = action.payload.data as IResponse<any>;

    if (error.isError && error.responseException) {
      if (error.statusCode === 500) {
        toast.error('伺服器錯誤');
      } else if (error.statusCode !== 401) {
        toast.error(error.responseException.exceptionMessage);
      }
      return next(action);
    }
  }

  return next(action);
};

export default errorToastMiddleware;
