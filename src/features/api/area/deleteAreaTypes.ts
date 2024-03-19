import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const deletAreaTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletAreaTypes: builder.mutation<IResponse<void>, string[]>({
      query: (tagTypes) => ({
        url: '/Area/type',
        method: 'DELETE',
        body: tagTypes,
      }),
      invalidatesTags: ['AreaType'],
    }),
  }),
});

export const { useDeletAreaTypesMutation } = deletAreaTypesApi;
