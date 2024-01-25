import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";

export const deleteResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteResume: builder.mutation<ResponseDTO<null>, string>({
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