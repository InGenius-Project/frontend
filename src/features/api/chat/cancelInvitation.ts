import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const cancelInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cancelInvitation: builder.mutation<IResponse<void>, { groupId: string; userId: string }>({
      query: ({ groupId, userId }) => ({
        url: `Chat/groups/${groupId}/users/${userId}/invitations`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ChatGroup'],
    }),
  }),
});

export const { useCancelInvitationMutation } = cancelInvitationApi;
