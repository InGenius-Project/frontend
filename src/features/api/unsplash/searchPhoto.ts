import { IUnsplashSearchOptions, IUnsplashSearchResult } from '@/types/interfaces/IUnsplashPhoto';
import { unsplashtApi } from '../unsplashApi';

export const searchPhotoApi = unsplashtApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPhoto: builder.query<IUnsplashSearchResult, IUnsplashSearchOptions>({
      query: (params) => ({
        url: `search/photos`,
        method: 'GET',
        params,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newSearchResult, { arg }) => {
        if (arg.page === 0) {
          return newSearchResult;
        }
        currentCache.results.push(...newSearchResult.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useSearchPhotoQuery, useLazySearchPhotoQuery } = searchPhotoApi;
