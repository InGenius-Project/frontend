import { IAreaTypePost } from "types/interfaces/IArea";
import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";

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
