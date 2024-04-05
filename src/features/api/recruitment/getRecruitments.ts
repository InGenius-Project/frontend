import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IRecruitment } from '@/types/interfaces/IRecruitment';

export const getRecruitmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query<IResponse<Array<IRecruitment>>, null>({
      query() {
        return {
          url: 'Recruitment',
          method: 'Get',
        };
      },
      providesTags: ['Recruitment'],
    }),
  }),
});

export const { useGetRecruitmentsQuery } = getRecruitmentsApi;
