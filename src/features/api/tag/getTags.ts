import { ResponseDTO } from "types/DTO/ResponseDTO";
import { TagDTO } from "types/TagDTO";
import { baseApi } from "../baseApi";

export const getTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ResponseDTO<TagDTO[]>, void>({
      query() {
        return {
          url: "/Tag",
          method: "GET",
        };
      },
      providesTags: ["Tag"],
    }),
  }),
});

export const { useGetTagsQuery } = getTagsApi;
