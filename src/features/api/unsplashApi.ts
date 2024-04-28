import { FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

const baseUrl = import.meta.env.VITE_APP_UNSPLASH_ENDPOINT as string;

const unsplashAccessKey = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

const unsplashtQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/`,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  paramsSerializer: (params) => qs.stringify({ ...params }, { arrayFormat: 'repeat' }),
});

function appendQueryStringParam(args: string | FetchArgs, key: string, value: string): string | FetchArgs {
  let urlEnd = typeof args === 'string' ? args : args.url;

  if (urlEnd.indexOf('?') < 0) urlEnd += '?';
  else urlEnd += '&';

  urlEnd += `${key}=${value}`;

  return typeof args === 'string' ? urlEnd : { ...args, url: urlEnd };
}

const dynamicUnsplashtQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  args = appendQueryStringParam(args, 'client_id', unsplashAccessKey);

  return unsplashtQuery(args, api, extraOptions);
};

export const unsplashtApi = createApi({
  reducerPath: 'upsplashtApi',
  baseQuery: dynamicUnsplashtQuery,
  endpoints: () => ({}),
  tagTypes: ['Photo'],
});
