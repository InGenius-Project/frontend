import { store } from '@/features/store';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const uploadAvatarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<IResponse<void>, { FormData: FormData }>({
      query: ({ FormData }) => ({
        url: `/user/Avatar`,
        method: 'POST',
        body: FormData,
      }),
      invalidatesTags: (result, error, arg) => {
        const userId = store.getState().userState.User?.Id;
        return [{ type: 'User', id: userId }];
      },
    }),
  }),
});

export const { useUploadAvatarMutation } = uploadAvatarApi;
