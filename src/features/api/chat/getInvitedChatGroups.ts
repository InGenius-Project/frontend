import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IChatGroupInfo } from '@/types/interfaces/IChat';

export const getInvitedChatGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvitedChatGroups: builder.query<IResponse<Array<IChatGroupInfo>>, void>({
      query: () => ({
        url: `Chat/Groups/Invited`,
        method: 'GET',
      }),
      providesTags: ['ChatGroup'],
    }),
  }),
});

export const { useGetInvitedChatGroupsQuery } = getInvitedChatGroupsApi;
