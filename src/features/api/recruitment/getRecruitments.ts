import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IOwnerRecruitment } from '@/types/interfaces/IRecruitment';

export const getRecruitments = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query<IResponse<Array<IOwnerRecruitment>>, null>({
      query() {
        return {
          url: 'Recruitment/All',
          method: 'Get',
        };
      },
      providesTags: (res) =>
        res
          ? [
              ...(res.result || []).map((r) => ({ type: 'Recruitment' as const, id: r.Id })),
              { type: 'Recruitment', id: 'List' },
            ]
          : [],
    }),
  }),
});

export const { useGetRecruitmentsQuery } = getRecruitments;
