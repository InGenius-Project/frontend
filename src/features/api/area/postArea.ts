import { setLayoutByArea } from '@/features/layout/layoutSlice';
import { IArea, IAreaPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postArea: builder.mutation<IResponse<IArea>, IAreaPost>({
      query: (body) => {
        return {
          url: `Area`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (res) => {
        return [{ type: 'Area', id: res?.result?.Id }];
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // set focused Area to new posted area
        const res = await queryFulfilled;
        res.data.result && dispatch(setLayoutByArea(res.data.result));
      },
    }),
  }),
});

export const { usePostAreaMutation } = postAreaApi;
