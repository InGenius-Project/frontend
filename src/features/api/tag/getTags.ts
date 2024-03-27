import { IResponse } from '@/types/interfaces/IResponse';
import { ITag } from '@/types/interfaces/ITag';
import { baseApi } from '../baseApi';
import { UserRole } from '@/types/enums/UserRole';

export const getTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<IResponse<ITag[]>, (string | UserRole)[]>({
      query(type) {
        return {
          url: '/Tag',
          method: 'GET',
          params: {
            type: type,
          },
        };
      },
      providesTags: ['Tag'],
    }),
  }),
});

export const { useGetTagsQuery } = getTagsApi;
