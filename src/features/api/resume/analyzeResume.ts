import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const analyzeResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    analyzeResume: builder.query<IResponse<void>, { resumeId: string }>({
      query: ({ resumeId }) => ({
        url: `Resume/${resumeId}/Analyze`,
        method: 'Get',
      }),
    }),
  }),
});

export const { useAnalyzeResumeQuery, useLazyAnalyzeResumeQuery } = analyzeResumeApi;
