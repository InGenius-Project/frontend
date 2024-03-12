import { setLayoutType } from '@/features/layout/layoutSlice';
import { IAreaType } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const getAreaTypeByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypeById: builder.query<IResponse<IAreaType>, number>({
      query(areaTypeId) {
        return {
          url: `Area/type/${areaTypeId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'AreaType', id: result?.result?.Id }];
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        if (result.data.result) dispatch(setLayoutType(result.data.result.LayoutType));
      },
    }),
  }),
});

export const { useGetAreaTypeByIdQuery } = getAreaTypeByIdApi;
