import { setUserInfo } from '@/features/user/userSlice';
import { IResponse } from '@/types/interfaces/IResponse';
import { IUserInfo } from '@/types/interfaces/IUser';
import { baseApi } from '../baseApi';

export const getUserProfile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<IResponse<IUserInfo>, string>({
      query: (userId) => ({
        url: `/User/Profile/${userId}`,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          data.result && dispatch(setUserInfo(data.result));
        } catch (error) {}
      },
      transformResponse: (response: IResponse<IUserInfo>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.result && response.result.Areas) {
          const orderedArea = response.result.Areas.sort((a, b) => a.Sequence - b.Sequence);
          return {
            ...response,
            result: {
              ...response.result,
              Areas: orderedArea,
            },
          };
        }
        return response;
      },
      providesTags: (res) =>
        res
          ? [
              ...(res.result?.Areas ?? []).map((a) => ({ type: 'Area' as const, id: a.Id })),
              { type: 'User', id: res.result?.Id },
            ]
          : [],
    }),
  }),
});

export const { useGetUserProfileQuery, usePrefetch } = getUserProfile;
