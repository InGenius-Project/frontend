import { setAreasSequence } from '@/features/areas/areasSlice';
import { IAreaSequencePost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postSequenceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postSequence: builder.mutation<IResponse<void>, Array<IAreaSequencePost>>({
      query: (body) => {
        return {
          url: '/Area/Sequence',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (res, error, arg) => {
        return arg.map((a) => ({ type: 'Area', id: a.Id }));
      },
      onQueryStarted: (request, { dispatch }) => {
        // optimistic update to prvent flicking Area
        dispatch(setAreasSequence(request));
      },
    }),
  }),
});

export const { usePostSequenceMutation } = postSequenceApi;
