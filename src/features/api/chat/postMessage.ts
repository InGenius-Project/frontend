import { IChat } from '@/types/interfaces/IChat';
import { chatBaseApi } from '../chatBaseApi';
import { getMessageApi } from './getMessage';

export const postMessageApi = chatBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    postMessage: builder.mutation<IChat, { content: string }>({
      query: ({ content }) => ({
        url: `/chat`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Message'],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          getMessageApi.util.updateQueryData('getMessage', undefined, (draft) => {
            Object.assign(draft, arg);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { usePostMessageMutation } = postMessageApi;
