import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorToastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      toast.error('伺服器未回應');
      return next(action);
    }

    if (action.payload.data.StatusCode === 500 || action.payload.data.StatusCode === 400) {
      toast.error(action.payload.data.Message);
      return next(action);
    }

    if (action.payload.data.Exception) {
      toast.error(action.payload.data.Exception);
    }
  }

  return next(action);
};

export default errorToastMiddleware;
