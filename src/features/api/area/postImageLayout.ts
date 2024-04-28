import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IImageTextLayoutPost } from '@/types/interfaces/IArea';

export const postImageTextLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postImageTextLayout: builder.mutation<IResponse<void>, IImageTextLayoutPost>({
      query: ({ AreaId, ...body }) => ({
        url: `/area/ImageTextLayout`,
        method: 'POST',
        body,
        params: {
          AreaId,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Area', id: arg.AreaId }];
      },
    }),
  }),
});

export const { usePostImageTextLayoutMutation } = postImageTextLayoutApi;
