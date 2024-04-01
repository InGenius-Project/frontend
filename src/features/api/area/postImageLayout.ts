import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postImageTextLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postImageTextLayout: builder.mutation<IResponse<void>, { AreaId: string; FormData: FormData }>({
      query: ({ AreaId, FormData }) => ({
        url: `/area/ImageTextLayout`,
        method: 'POST',
        body: FormData,
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
