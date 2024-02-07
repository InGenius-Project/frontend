import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaTypeDTO } from "types/DTO/AreaDTO";
import { getUserApi } from "../user/getUser";
import { UserRole } from "types/DTO/UserDTO";

type GetAreaTypesRequest = { userRoles?: UserRole[] };
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
          params: params.userRoles && { userRoles: params.userRoles },
        };
      },
      providesTags: ["AreaType"],
    }),
  }),
});

export const { useGetAreaTypesQuery, useLazyGetAreaTypesQuery } =
  getAreaTypesApi;
