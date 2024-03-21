import { IAreaType, IAreaTypePost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { getAreaTypeByIdApi } from './getAreaTypeById';

export const postAreaType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postAreaType: builder.mutation<IResponse<null>, IAreaTypePost>({
      query: (body) => {
        return {
          url: `Area/type`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AreaType'],
      onQueryStarted: (request, { dispatch }) => {
        // optimistic update to prvent flicking Area
        if (request.Id) {
          dispatch(
            getAreaTypeByIdApi.util.updateQueryData('getAreaTypeById', request.Id, (draft) => {
              return {
                ...draft,
                result: {
                  ...(draft.result as IAreaType),
                },
              };
            }),
          );
        }
      },
    }),
  }),
});

export const { usePostAreaTypeMutation } = postAreaType;
