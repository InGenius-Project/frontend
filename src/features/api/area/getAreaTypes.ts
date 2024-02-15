import { AreaTypeDTO } from "types/DTO/AreaDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { UserRole } from "types/DTO/UserDTO";
import { baseApi } from "../baseApi";

type GetAreaTypesRequest = { roles?: UserRole[] };
export const getAreaTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypes: builder.query<
      ResponseDTO<AreaTypeDTO[]>,
      GetAreaTypesRequest
    >({
      query(params) {
        return {
          url: "/Area/type",
          method: "GET",
          params: params.roles && { roles: params.roles },
        };
      },
      providesTags: ["AreaType"],
    }),
  }),
});

export const { useGetAreaTypesQuery, useLazyGetAreaTypesQuery } =
  getAreaTypesApi;
