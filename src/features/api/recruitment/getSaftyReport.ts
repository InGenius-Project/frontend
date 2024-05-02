import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { ISaftyReport } from '@/types/interfaces/IRecruitment';

export const getSaftyReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSaftyReport: builder.query<IResponse<ISaftyReport>, string>({
      query: (recruitmentId) => ({
        url: `Recruitment/report/${recruitmentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSaftyReportQuery } = getSaftyReportApi;
