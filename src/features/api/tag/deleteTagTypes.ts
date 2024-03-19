import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const deleteTagTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTagTypes: builder.mutation<IResponse<void>, string[]>({
      query: (tagTypes) => ({
        url: '/Tag/type',
        method: 'DELETE',
        body: tagTypes,
      }),
      invalidatesTags: ['TagType'],
    }),
  }),
});

export const { useDeleteTagTypesMutation } = deleteTagTypesApi;
