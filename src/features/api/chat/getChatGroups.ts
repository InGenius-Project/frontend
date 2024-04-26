import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IChatGroupInfo } from '@/types/interfaces/IChat';

export const getChatGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatGroups: builder.query<IResponse<Array<IChatGroupInfo>>, null>({
      query: () => ({
        url: `Chat/Groups/`,
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

export const { useGetChatGroupsQuery, usePrefetch } = getChatGroupsApi;
