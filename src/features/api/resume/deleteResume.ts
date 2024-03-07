import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";

export const deleteResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteResume: builder.mutation<IResponse<null>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ResumeLists"],
    }),
  }),
});

export const { useDeleteResumeMutation } = deleteResumeApi;
