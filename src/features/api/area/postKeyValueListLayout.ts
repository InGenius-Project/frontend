import { IKeyValueListLayoutPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postKeyValueListLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postKeyValueListLayout: builder.mutation<IResponse<void>, IKeyValueListLayoutPost>({
      query: ({ AreaId: areaId, ...body }) => ({
        url: `/area/KeyValueListLayout`,
        method: 'POST',
        body: {
          ...body,
          Items: body.Items?.map((i) => ({
            ...i,
            Id: null,
          })),
          Id: null,
        },
        params: {
          areaId,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Area', id: arg.AreaId }, { type: 'Area' }, { type: 'User' }];
      },
    }),
  }),
});

export const { usePostKeyValueListLayoutMutation } = postKeyValueListLayoutApi;
