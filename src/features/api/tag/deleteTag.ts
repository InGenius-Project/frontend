import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const deleteTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTags: builder.mutation<IResponse<void>, string[]>({
      query: (tags) => ({
        url: '/Tag/type',
        method: 'DELETE',
        body: tags,
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

export const { useDeleteTagsMutation } = deleteTagsApi;
