import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaTypeDTO } from "types/DTO/AreaDTO";

export const postAreaType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postAreaType: builder.mutation<
      ResponseDTO<null>,
      Partial<Pick<AreaTypeDTO, "Id">> & Omit<AreaTypeDTO, "Id">
    >({
      query: (body) => {
        return {
          url: `Area/type`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AreaType"],
    }),
  }),
});

export const { usePostAreaTypeMutation } = postAreaType;
