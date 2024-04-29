import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IImageTextLayoutPost } from '@/types/interfaces/IArea';
import { store } from '@/features/store';

export const postImageTextLayoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postImageTextLayout: builder.mutation<IResponse<void>, IImageTextLayoutPost>({
      query: ({ AreaId, Uri, AltContent, TextContent, Image }) => {
        const form = new FormData();
        const state = store.getState();

        if (state.layoutState.imageType === 'uri') Uri && form.append('Uri', Uri);

        if (state.layoutState.imageType === 'blob') Image && form.append('Image', Image, AltContent || 'Untitled');

        form.append('TextContent', TextContent);
        form.append('AltContent', AltContent);

        return {
          url: `/area/ImageTextLayout`,
          method: 'POST',
          body: form,
          params: {
            AreaId,
          },
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Area', id: arg.AreaId }];
      },
    }),
  }),
});

export const { usePostImageTextLayoutMutation } = postImageTextLayoutApi;
