import env from '@/assets/utils/env';
import { IResponse } from '@/types/interfaces/IResponse';
import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function displayError(error: any) {
  if (env === 'development') {
    toast.error(error);
  } else {
    console.error(error);
  }
}

const errorToastMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      displayError('網路錯誤，請稍後再試');
      return next(action);
    }
    const error = action.payload.data as IResponse<any>;

    if (error.isError && error.responseException) {
      if (error.statusCode === 500) {
        displayError('伺服器錯誤，請稍後再試');
      } else if (error.statusCode !== 401) {
        displayError(error.responseException.exceptionMessage);
      }
      return next(action);
    }
  }

  return next(action);
};

export default errorToastMiddleware;
