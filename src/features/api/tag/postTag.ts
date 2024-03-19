import { IResponse } from '@/types/interfaces/IResponse';
import { ITag, ITagPost } from '@/types/interfaces/ITag';
import { baseApi } from '../baseApi';

export const postTag = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTag: builder.mutation<IResponse<null>, ITagPost>({
      query: (body) => {
        return {
          url: `Tag`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Tag'],
    }),
  }),
});

export const { usePostTagMutation } = postTag;
