import { IAreaType } from "types/interfaces/IArea";
import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";

export const getAreaTypeByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaTypeById: builder.query<IResponse<IAreaType>, number>({
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
