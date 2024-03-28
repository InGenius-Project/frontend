import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from './baseApi';
import { IListLayoutPost } from '@/types/interfaces/IArea';

export const postListLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postListLayout: builder.mutation<IResponse<void>, IListLayoutPost>({
      query: ({ areaId, ...body }) => ({
        url: `/area/ListLayout/${areaId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Area', id: arg.areaId }];
      },
    }),
  }),
});

export const { usePostListLayoutMutation } = postListLayoutApi;
