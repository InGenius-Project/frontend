import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IRecruitment } from '@/types/interfaces/IRecruitment';

export const searchRelativeRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRelativeRecruitment: builder.query<IResponse<IRecruitment[]>, { resumeId: string }>({
      query: ({ resumeId }) => ({
        url: `Resume/${resumeId}/Relative`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazySearchRelativeRecruitmentQuery, useSearchRelativeRecruitmentQuery } =
  searchRelativeRecruitmentApi;
