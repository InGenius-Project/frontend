import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const deleteChatGroup = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteChatGroup: builder.mutation<IResponse<void>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `Chat/Groups/${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ChatGroup' }],
    }),
  }),
});

export const { useDeleteChatGroupMutation } = deleteChatGroup;
