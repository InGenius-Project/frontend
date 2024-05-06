import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { AreaType } from '@/types/enums/AreaType';

export const getUserAreaByAreaTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAreaByAreaType: builder.query<IResponse<IArea[]>, AreaType>({
      query(areaTypeId) {
        return {
          url: `Area/AreaType/${areaTypeId}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetUserAreaByAreaTypeQuery } = getUserAreaByAreaTypeApi;
