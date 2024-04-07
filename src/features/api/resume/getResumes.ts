import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { IResume } from '@/types/interfaces/IResume';

export const getResumesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<IResponse<Array<IResume>>, null>({
      query() {
        return {
          url: 'Resume',
          method: 'Get',
        };
      },
      providesTags: (res) =>
        res
          ? [...(res.result || []).map((r) => ({ type: 'Resume' as const, id: r.Id })), { type: 'Resume', id: 'List' }]
          : [],
    }),
  }),
});

export const { useGetResumesQuery } = getResumesApi;
