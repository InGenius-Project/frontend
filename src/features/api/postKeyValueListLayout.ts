import { IKeyValueListLayoutPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from './baseApi';

export const postKeyValueListLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postKeyValueListLayout: builder.mutation<IResponse<void>, IKeyValueListLayoutPost>({
      query: ({ areaId, ...body }) => ({
        url: `/area/KeyValueListLayout`,
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

export const { usePostKeyValueListLayoutMutation } = postKeyValueListLayoutApi;
