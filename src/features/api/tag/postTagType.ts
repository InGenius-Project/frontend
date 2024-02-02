import { ResponseDTO } from "types/DTO/ResponseDTO";
import { TagTypeDTO } from "types/TagDTO";
import { baseApi } from "../baseApi";

export const postTagType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTagType: builder.mutation<
      ResponseDTO<null>,
      Partial<Pick<TagTypeDTO, "Id">> & Omit<TagTypeDTO, "Id">
    >({
      query: (body) => {
        return {
          url: `Tag/type`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["TagType"],
    }),
  }),
});

export const { usePostTagTypeMutation } = postTagType;
