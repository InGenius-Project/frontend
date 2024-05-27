import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/features/store';
import qs from 'qs';

const baseUrl = import.meta.env.VITE_APP_SERVER_ENDPOINT as string;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  prepareHeaders: (headers, { getState }) => {
    // if (!headers.has('Content-Type')) {
    //   headers.set('Content-Type', 'application/json');
    // }

    var token = (getState() as RootState).userState.Token?.AccessToken;
    if (!token) {
      token = localStorage.getItem('accessToken') || undefined;
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export const apiTags = [
  'User',
  'Resume',
  'ResumeLists',
  'Area',
  'AreaType',
  'Recruitment',
  'RecruitmentLists',
  'TagType',
  'Tag',
  'ChatGroup',
];

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: apiTags,
});
