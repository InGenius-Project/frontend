import { setUserInfo } from '@/features/user/userSlice';
import { IResponse } from '@/types/interfaces/IResponse';
import { IConnection, IUserInfo } from '@/types/interfaces/IUser';
import { baseApi } from '../baseApi';

export const getUserConnection = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserConnection: builder.query<IResponse<Array<IConnection>>, null>({
      query: () => ({
        url: '/user/connection',
      }),

      providesTags: (res) =>
        res
          ? [
              ...(res.result || []).map((r) => ({ type: 'Connection' as const, id: r.ConnectionId })),
              { type: 'Connection', id: 'List' },
            ]
          : [],
    }),
  }),
});

export const { useGetUserConnectionQuery, usePrefetch } = getUserConnection;
