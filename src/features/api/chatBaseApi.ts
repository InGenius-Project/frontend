import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

const baseUrl = import.meta.env.VITE_APP_CHAT_ENDPOINT as string;

const chatQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export const chatBaseApi = createApi({
  reducerPath: 'chatBaseApi',
  baseQuery: chatQuery,
  endpoints: () => ({}),
  tagTypes: ['Message'],
});
