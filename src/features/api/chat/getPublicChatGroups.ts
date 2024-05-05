import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IChatGroupInfo } from '@/types/interfaces/IChat';

export const getPublicChatGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicChatGroup: builder.query<IResponse<Array<IChatGroupInfo>>, void>({
      query: () => ({
        url: `Chat/Groups/Public`,
      }),
      providesTags: (res) =>
        res
          ? [
              ...(res.result || []).map((r) => ({ type: 'ChatGroup' as const, id: r.Id })),
              { type: 'ChatGroup', id: 'List' },
            ]
          : [],
    }),
  }),
});

export const { useGetPublicChatGroupQuery } = getPublicChatGroupsApi;
