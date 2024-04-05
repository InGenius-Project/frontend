import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const deleteAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteArea: builder.mutation<IResponse<null>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (res, error, areaId) => [{ type: 'Area', id: areaId }],
    }),
  }),
});

export const { useDeleteAreaMutation } = deleteAreaApi;
