import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IResume } from '@/types/interfaces/IResume';

export const searchRelativeResumesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRelativeResumes: builder.query<
      IResponse<IResume[]>,
      {
        recruitmentId: string;
        searchAll: boolean;
      }
    >({
      query: ({ recruitmentId, searchAll }) => ({
        url: `Recruitment/${recruitmentId}/relative?searchAll=${searchAll}`,
        method: 'Get',
      }),
    }),
  }),
});

export const { useLazySearchRelativeResumesQuery, useSearchRelativeResumesQuery } = searchRelativeResumesApi;
