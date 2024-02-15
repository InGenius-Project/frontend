import { IResponse } from "types/interfaces/IResponse";
import { IResume } from "types/interfaces/IResume";
import { baseApi } from "../baseApi";

export const getResumeByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumeById: builder.query<IResponse<IResume>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "Get",
        };
      },
      providesTags: (result) => {
        return [{ type: "Resume", id: result?.result?.Id }];
      },
      transformResponse: (response: IResponse<IResume>, meta, arg) => {
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
