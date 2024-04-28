import { IResponse } from '@/types/interfaces/IResponse';
import { IUnsplashPhoto } from '@/types/interfaces/IUnsplashPhoto';
import { unsplashtApi } from '../unsplashApi';

export const getRandomPhotoApi = unsplashtApi.injectEndpoints({
  endpoints: (builder) => ({
    getRandomPhoto: builder.query<IUnsplashPhoto, void>({
      query: () => ({
        url: `photos/random`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRandomPhotoQuery } = getRandomPhotoApi;
