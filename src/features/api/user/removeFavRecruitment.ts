import { baseApi } from '../baseApi';

export const removeFavRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    removeFavRecruitment: builder.mutation<void, string[]>({
      query(body) {
        return {
          url: 'User/Fav/Recruitment',
          method: 'Delete',
          body,
        };
      },
      invalidatesTags: (res, error, arg) => {
        return arg.map((id) => ({ type: 'Recruitment', id }));
      },
    }),
  }),
});

export const { useRemoveFavRecruitmentMutation } = removeFavRecruitmentApi;
