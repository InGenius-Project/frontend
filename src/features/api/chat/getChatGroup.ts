import { IChatGroup } from '@/types/interfaces/IChat';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const getChatGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatGroup: builder.query<IResponse<IChatGroup>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `Chat/Groups/${groupId}`,
      }),
    }),
  }),
});

export const { useGetChatGroupQuery, usePrefetch } = getChatGroupApi;
