import { ResponseDTO } from "types/DTO/ResponseDTO";
import { ResumeDTO } from "types/DTO/ResumeDTO";
import { baseApi } from "../baseApi";

export const getResumeByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumeById: builder.query<ResponseDTO<ResumeDTO>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "Get",
        };
      },
      providesTags: (result) => {
        return [{ type: "Resume", id: result?.result?.Id }];
      },
      transformResponse: (response: ResponseDTO<ResumeDTO>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.result) {
          const orderedArea = response.result.Areas.sort(
            (a, b) => a.Sequence - b.Sequence
          );
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

export const { useGetResumeByIdQuery } = getResumeByIdApi;
