import { ResponseDTO } from "types/DTO/ResponseDTO";
import { TagDTO } from "types/TagDTO";
import { baseApi } from "../baseApi";

export const postTag = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTag: builder.mutation<
      ResponseDTO<null>,
      Partial<Pick<TagDTO, "Id">> & Omit<TagDTO, "Id">
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
