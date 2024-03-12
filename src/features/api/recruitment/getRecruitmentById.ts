import { IRecruitment } from '@/types/interfaces/IRecruitment';
import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';

export const getRecruitmentByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentById: builder.query<IResponse<IRecruitment>, string>({
      query(id) {
        return {
          url: `Recruitment/${id}`,
          method: 'Get',
        };
      },
      providesTags: (result) => {
        return [{ type: 'Recruitment', id: result?.result?.Id }];
      },
      transformResponse: (response: IResponse<IRecruitment>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.result) {
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
    }),
  }),
});

export const { useGetRecruitmentByIdQuery } = getRecruitmentByIdApi;
