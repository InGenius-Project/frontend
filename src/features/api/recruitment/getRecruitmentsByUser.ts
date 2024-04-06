import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IOwnerRecruitment } from '@/types/interfaces/IRecruitment';

export const getRecruitmentsByUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentsByUser: builder.query<IResponse<Array<IOwnerRecruitment>>, null>({
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

export const { useGetRecruitmentsByUserQuery } = getRecruitmentsByUserApi;
