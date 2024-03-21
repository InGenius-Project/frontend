import { UserRole } from '@/types/enums/UserRole';
import { IAreaType } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

type GetAreaTypesRequest = { roles?: UserRole[] };
export const getAreaTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypes: builder.query<IResponse<IAreaType[]>, GetAreaTypesRequest>({
      query(params) {
        return {
          url: '/Area/type',
          method: 'GET',
          params: params.roles && { roles: params.roles },
        };
      },
      providesTags: ['AreaType'],
    }),
  }),
});

export const { useGetAreaTypesQuery, useLazyGetAreaTypesQuery } = getAreaTypesApi;
