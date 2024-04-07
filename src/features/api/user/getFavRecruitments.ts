import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IRecruitment } from '@/types/interfaces/IRecruitment';

export const getFavRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavRecruitment: builder.query<IResponse<IRecruitment[]>, void>({
      query() {
        return {
          url: 'User/Fav/Recruitment',
          method: 'Get',
        };
      },
      providesTags: (res) =>
        res && res.result
          ? res.result.map((r) => ({
              type: 'Recruitment',
              id: r.Id,
            }))
          : ['Recruitment'],
    }),
  }),
});

export const { useGetFavRecruitmentQuery } = getFavRecruitmentApi;
