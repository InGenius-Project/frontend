import { ITextLayoutPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postTextLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTextLayout: builder.mutation<IResponse<void>, ITextLayoutPost>({
      query: ({ areaId, ...body }) => ({
        url: `/area/TextLayout`,
        method: 'POST',
        body,
        params: {
          areaId,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Area', id: arg.areaId }];
      },
    }),
  }),
});

export const { usePostTextLayoutMutation } = postTextLayoutApi;
