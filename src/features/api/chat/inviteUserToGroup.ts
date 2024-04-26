import { baseApi } from '../baseApi';

export const inviteUserToGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    inviteUserToGroup: builder.mutation<void, { groupId: string; userId: string }>({
      query: ({ groupId, userId }) => ({
        url: `Chat/Groups/Invite/${groupId}/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useInviteUserToGroupMutation } = inviteUserToGroupApi;
