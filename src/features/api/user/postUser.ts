import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IUserInfo, IUserInfoPost } from '@/types/interfaces/IUser';
import { getUserApi } from './getUser';

export const postUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<IResponse<IUserInfo>, IUserInfoPost>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { usePostUserMutation } = postUserApi;
