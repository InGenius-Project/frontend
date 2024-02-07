import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaTypeDTO } from "types/DTO/AreaDTO";

export const getAreaTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypes: builder.query<ResponseDTO<AreaTypeDTO[]>, void>({
      query() {
        return {
          url: "/Area/type",
          method: "GET",
        };
      },
      providesTags: ["AreaType"],
    }),
  }),
});

export const { useGetAreaTypesQuery } = getAreaTypesApi;
