import { IChat } from '@/types/interfaces/IChat';
import { chatBaseApi } from '../chatBaseApi';

export const getMessageApi = chatBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query<Array<IChat>, void>({
      query: () => ({
        url: `/chat_history`,
        method: 'GET',
      }),
      providesTags: ['Message'],
      onCacheEntryAdded: async (arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {},
    }),
  }),
});

export const { useGetMessageQuery } = getMessageApi;
