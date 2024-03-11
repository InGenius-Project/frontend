import { ResponseDTO } from "@/types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaDTO } from "@/types/DTO/AreaDTO";

export const getAreaByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaById: builder.query<ResponseDTO<AreaDTO>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Area", id: result?.Data?.Id }];
      },
    }),
  }),
});

export const { useGetAreaByIdQuery } = getAreaByIdApi;
