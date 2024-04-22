import { setLayoutByArea } from '@/features/layout/layoutSlice';
import { IArea, IAreaPost, IGenerateAreaByTitlePost, IGenerateAreaPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { store } from '@/features/store';
import { AreasType } from '@/features/areas/areasSlice';

export const generateAreaByTitleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateAreaByTitle: builder.mutation<IResponse<Array<IArea>>, IGenerateAreaByTitlePost>({
      query: (body) => {
        return {
          url: `Area/Generation/Title`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGenerateAreaByTitleMutation } = generateAreaByTitleApi;
