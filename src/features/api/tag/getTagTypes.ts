import { IResponse } from "types/interfaces/IResponse";
import { ITagType } from "types/interfaces/ITag";
import { baseApi } from "../baseApi";

export const getTagTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTagTypes: builder.query<IResponse<ITagType[]>, void>({
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
