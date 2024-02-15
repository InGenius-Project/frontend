import { AreaTypeDTO } from "types/DTO/AreaDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";

export const getAreaTypeByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypeById: builder.query<ResponseDTO<AreaTypeDTO>, number>({
      query(areaTypeId) {
        return {
          url: `Area/${areaTypeId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: "AreaType", id: result?.result?.Id }];
      },
    }),
  }),
});

export const { useGetAreaTypeByIdQuery } = getAreaTypeByIdApi;
