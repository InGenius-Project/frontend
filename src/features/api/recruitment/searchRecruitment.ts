import { IRecruitmentSearchPost, IRecruitmentSearchResult } from '@/types/interfaces/IRecruitment';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const searchRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRecruitment: builder.query<IResponse<IRecruitmentSearchResult>, IRecruitmentSearchPost>({
      query(body) {
        return {
          url: 'Recruitment/search',
          method: 'POST',
          body,
        };
      },
      providesTags: (res) =>
        res
          ? [
              ...(res.result?.result || []).map((r) => ({ type: 'Recruitment' as const, id: r.Id })),
              { type: 'Recruitment', id: 'List' },
            ]
          : [],
    }),
  }),
});

export const { useSearchRecruitmentQuery, useLazySearchRecruitmentQuery } = searchRecruitmentApi;
