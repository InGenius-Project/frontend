import { IResponse } from '@/types/interfaces/IResponse';
import { ITag } from '@/types/interfaces/ITag';
import { baseApi } from '../baseApi';

export const getTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<IResponse<ITag[]>, void>({
      query() {
        return {
          url: '/Tag',
          method: 'GET',
        };
      },
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsQuery } = getTagsApi;
