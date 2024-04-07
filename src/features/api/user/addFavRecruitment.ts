import { baseApi } from '../baseApi';

export const addFavRecruitmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavRecruitment: builder.mutation<void, string[]>({
      query(body) {
        return {
          url: 'User/Fav/Recruitment',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: (res, error, arg) => {
        return arg.map((id) => ({ type: 'Recruitment', id }));
      },
    }),
  }),
});

export const { useAddFavRecruitmentMutation } = addFavRecruitmentApi;
