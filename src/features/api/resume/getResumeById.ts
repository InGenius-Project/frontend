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
        return [{ type: "Resume", id: result?.Data?.Id }];
      },
      transformResponse: (response: ResponseDTO<ResumeDTO>, meta, arg) => {
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

export const { useGetResumeByIdQuery } = getResumeByIdApi;
