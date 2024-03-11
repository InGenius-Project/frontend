import { RecruitmentDTO } from "@/types/DTO/RecruitmentDTO";
import { ResponseDTO } from "@/types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";

export const getRecruitmentByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitmentById: builder.query<ResponseDTO<RecruitmentDTO>, string>({
      query(id) {
        return {
          url: `Recruitment/${id}`,
          method: "Get",
        };
      },
      providesTags: (result) => {
        return [{ type: "Recruitment", id: result?.Data?.Id }];
      },
      transformResponse: (response: ResponseDTO<RecruitmentDTO>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.Data) {
          const orderedArea = response.Data.Areas.sort(
            (a, b) => a.Sequence - b.Sequence
          );
          return {
            ...response,
            Data: {
              ...response.Data,
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
