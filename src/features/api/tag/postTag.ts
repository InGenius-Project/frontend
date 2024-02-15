import { IResponse } from "types/interfaces/IResponse";
import { ITag } from "types/interfaces/ITag";
import { baseApi } from "../baseApi";

export const postTag = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTag: builder.mutation<
      IResponse<null>,
      Partial<Pick<ITag, "Id">> & Omit<ITag, "Id">
    >({
      query: (body) => {
        return {
          url: `Tag`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const { usePostTagMutation } = postTag;
