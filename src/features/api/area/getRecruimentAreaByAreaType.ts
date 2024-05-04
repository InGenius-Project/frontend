import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const getRecruitmentAreaByAreaTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentAreaByAreaType: builder.query<
      IResponse<IArea[]>,
      {
        areaTypeId: number;
        recruitmentId: string;
      }
    >({
      query({ areaTypeId, recruitmentId }) {
        return {
          url: `Area/AreaType/${areaTypeId}/${recruitmentId}`,
          method: 'GET',
        };
      },
      providesTags: (res) => {
        return res?.result?.map((a) => ({ type: 'Area' as const, id: a.Id })) || [];
      },
    }),
  }),
});

export const { useGetRecruitmentAreaByAreaTypeQuery } = getRecruitmentAreaByAreaTypeApi;
