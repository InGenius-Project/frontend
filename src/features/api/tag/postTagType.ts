import { IResponse } from "types/interfaces/IResponse";
import { ITagType } from "types/interfaces/ITag";
import { baseApi } from "../baseApi";

export const postTagType = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTagType: builder.mutation<IResponse<null>, ITagType>({
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
