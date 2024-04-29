import { IUnsplashSearchOptions, IUnsplashSearchResult } from '@/types/interfaces/IUnsplashPhoto';
import { unsplashtApi } from '../unsplashApi';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

export const searchPhotoApi = unsplashtApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPhoto: builder.query<IUnsplashSearchResult, IUnsplashSearchOptions>({
      query: (params) => ({
        url: `search/photos`,
        method: 'GET',
        params,
      }),
      serializeQueryArgs: ({ endpointName, endpointDefinition, queryArgs }) => {
        const { query } = queryArgs;
        return defaultSerializeQueryArgs({
          endpointName,
          queryArgs: {
            query,
          },
          endpointDefinition,
        });
      },
      merge: (currentCache, newSearchResult, { arg }) => {
        currentCache.results.push(...newSearchResult.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useSearchPhotoQuery, useLazySearchPhotoQuery } = searchPhotoApi;
