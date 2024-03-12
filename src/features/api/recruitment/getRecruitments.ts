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
      providesTags: () => {
        return ['Recruitment', 'RecruitmentLists'];
      },
    }),
  }),
});

export const { useGetRecruitmentsQuery } = getRecruitmentsApi;
