import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";

export const deleteAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteArea: builder.mutation<IResponse<null>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resume", "User"],
    }),
  }),
});

export const { useDeleteAreaMutation } = deleteAreaApi;
