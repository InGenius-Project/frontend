import { setLayoutByArea } from '@/features/layout/layoutSlice';
import { IArea, IAreaPost } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { store } from '@/features/store';
import { AreasType } from '@/features/areas/areasSlice';

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
        const areasType = store.getState().areasState.type;
        const areasTag =
          areasType === AreasType.RECRUITMENT
            ? {
                type: 'Recruitment' as const,
                id: res?.result?.RecruitmentId,
              }
            : areasType === AreasType.PROFILE
              ? {
                  type: 'User' as const,
                  id: res?.result?.UserId,
                }
              : null;

        return [{ type: 'Area', id: res?.result?.Id }, ...(areasTag ? [areasTag] : [])];
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
