import { store } from '@/features/store';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { AvatarPostFormData } from '@/types/interfaces/IUser';

export const uploadAvatarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<IResponse<void>, AvatarPostFormData>({
      query: (body) => ({
        url: `/user/Avatar`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => {
        const userId = store.getState().userState.User?.Id;
        return [{ type: 'User', id: userId }];
      },
    }),
  }),
});

export const { useUploadAvatarMutation } = uploadAvatarApi;
