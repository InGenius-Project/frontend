import { setLayoutByArea } from '@/features/layout/layoutSlice';
import { IArea, IAreaPost, IGenerateAreaPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { store } from '@/features/store';
import { AreasType } from '@/features/areas/areasSlice';

export const generateAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateArea: builder.mutation<IResponse<Array<IArea>>, IGenerateAreaPost>({
      query: (body) => {
        return {
          url: `Area/Generation`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useGenerateAreaMutation } = generateAreaApi;
