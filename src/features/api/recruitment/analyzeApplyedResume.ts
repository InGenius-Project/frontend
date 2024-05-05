import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const analyzeApplyedResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    analyzeApplyedResume: builder.query<IResponse<void>, { recruitmentId: string }>({
      query: ({ recruitmentId }) => ({
        url: `Recruitment/${recruitmentId}/Apply/Resume/Analyze`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyAnalyzeApplyedResumeQuery } = analyzeApplyedResumeApi;
