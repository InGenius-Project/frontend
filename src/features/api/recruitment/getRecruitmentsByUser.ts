import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IRecruitment } from '@/types/interfaces/IRecruitment';

export const getRecruitmentsByUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query<IResponse<Array<IRecruitment>>, null>({
      query() {
        return {
          url: 'Recruitment',
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

export const { useGetRecruitmentsQuery } = getRecruitmentsByUserApi;
