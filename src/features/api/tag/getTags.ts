import { IResponse } from '@/types/interfaces/IResponse';
import { ITag } from '@/types/interfaces/ITag';
import { baseApi } from '../baseApi';

export const getTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<IResponse<ITag[]>, string[] | undefined>({
      query(type) {
        return {
          url: '/Tag',
          method: 'GET',
          params: type ? { typeId: type } : undefined,
        };
      },
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsQuery } = getTagsApi;
