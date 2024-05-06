import { IChatGroup } from '@/types/interfaces/IChat';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const joinGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinGroup: builder.mutation<IResponse<IChatGroup>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `Chat/Groups/Join/${groupId}`,
        method: 'POST',
      }),
      invalidatesTags: ['ChatGroup'],
    }),
  }),
});

export const { useJoinGroupMutation, usePrefetch } = joinGroupApi;
