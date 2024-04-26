import { IChat } from '@/types/interfaces/IChat';
import { chatBaseApi } from '../chatBaseApi';

export const getAiChatHistory = chatBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAiChatHistory: builder.query<Array<IChat>, { userId: string }>({
      query: ({ userId }) => ({
        url: `/chat_history`,
        method: 'GET',
        params: { user_id: userId },
      }),
      providesTags: ['Message'],
    }),
  }),
});

export const { useGetAiChatHistoryQuery } = getAiChatHistory;
