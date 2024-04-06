import { IOwnerRecruitment, IRecruitmentPost } from '@/types/interfaces/IRecruitment';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const postRecruitment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRecruitment: builder.mutation<IResponse<IOwnerRecruitment>, IRecruitmentPost>({
      query(body) {
        return {
          url: 'Recruitment',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: (res) => {
        return [
          { type: 'Recruitment', id: res?.result?.Id },
          { type: 'Recruitment', id: 'List' },
        ];
      },
    }),
  }),
});

export const { usePostRecruitmentMutation } = postRecruitment;
