import { IChatGroup } from '@/types/interfaces/IChat';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const joinGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinGroup: builder.query<IResponse<IChatGroup>, { groupId: string }>({
      query: ({ groupId }) => ({
        url: `Chat/Groups/Join/${groupId}`,
      }),
    }),
  }),
});

export const { useJoinGroupQuery, usePrefetch, useLazyJoinGroupQuery } = joinGroupApi;
