import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";

export const deletAreaTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletAreaTypes: builder.mutation<ResponseDTO<void>, string[]>({
      query: (tagTypes) => ({
        url: "/Area/type",
        method: "DELETE",
        body: tagTypes,
      }),
      invalidatesTags: ["AreaType"],
    }),
  }),
});

export const { useDeletAreaTypesMutation } = deletAreaTypesApi;
