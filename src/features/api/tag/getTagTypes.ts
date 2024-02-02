import { ResponseDTO } from "types/DTO/ResponseDTO";
import { TagTypeDTO } from "types/TagDTO";
import { baseApi } from "../baseApi";

export const getTagTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTagTypes: builder.query<ResponseDTO<TagTypeDTO[]>, void>({
      query() {
        return {
          url: "/Tag/type",
          method: "GET",
        };
      },
      providesTags: ["TagType"],
    }),
  }),
});

export const { useGetTagTypesQuery } = getTagTypesApi;
