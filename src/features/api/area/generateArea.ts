import { IArea, IGenerateAreaPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

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
