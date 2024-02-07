import { ResponseDTO } from "types/DTO/ResponseDTO";
import { TagTypeDTO } from "types/TagDTO";
import { baseApi } from "../baseApi";

export const postTagType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTagType: builder.mutation<ResponseDTO<null>, TagTypeDTO>({
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
