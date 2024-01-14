import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";
import { setAreas } from "features/areas/areasSlice";
import { createLogicalAnd } from "typescript";

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
