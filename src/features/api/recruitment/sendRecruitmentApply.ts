import { IRecruitmentApplyPost } from '@/types/interfaces/IRecruitment';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const sendRecruitmentApplyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendRecruitmentApply: builder.mutation<IResponse<void>, IRecruitmentApplyPost>({
      query(body) {
        return {
          url: `Recruitment/${body.RecruitmentId}/Apply/${body.ResumeId}`,
          method: 'Post',
        };
      },
    }),
  }),
});

export const { useSendRecruitmentApplyMutation } = sendRecruitmentApplyApi;
