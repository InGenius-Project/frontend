import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IArea } from '@/types/interfaces/IArea';

export const getAreaByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaById: builder.query<IResponse<IArea>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'Area', id: result?.result?.Id }];
      },
    }),
  }),
});

export const { useGetAreaByIdQuery } = getAreaByIdApi;
