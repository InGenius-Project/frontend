import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const getUserAreaByAreaTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAreaByAreaType: builder.query<IResponse<IArea[]>, number>({
      query(areaTypeId) {
        return {
          url: `Area/AreaType/${areaTypeId}`,
          method: 'GET',
        };
      },
      providesTags: (res) => {
        return res?.result?.map((a) => ({ type: 'Area' as const, id: a.Id })) || [];
      },
    }),
  }),
});

export const { useGetUserAreaByAreaTypeQuery } = getUserAreaByAreaTypeApi;
