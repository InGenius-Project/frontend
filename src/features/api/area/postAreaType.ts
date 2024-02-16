import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { IAreaType, IAreaTypePost } from "types/interfaces/IArea";

export const postAreaType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postAreaType: builder.mutation<IResponse<null>, IAreaTypePost>({
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
