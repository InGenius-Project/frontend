import { store } from '@/features/store';
import { IResponse } from '@/types/interfaces/IResponse';
import { IImagePost } from '@/types/interfaces/IUser';
import { baseApi } from '../baseApi';

export const uploadAvatarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBackground: builder.mutation<IResponse<void>, IImagePost>({
      query: (body) => {
        var form = new FormData();
        body.Image && form.append('Image', body.Image, 'background.jpg');
        body.Uri && form.append('Uri', body.Uri);
        return {
          url: `/user/background`,
          method: 'POST',
          body: form,
        };
      },
      invalidatesTags: (result, error, arg) => {
        const userId = store.getState().userState.User?.Id;
        return [{ type: 'User', id: userId }];
      },
    }),
  }),
});

export const { usePostBackgroundMutation } = uploadAvatarApi;
