import { ResumePostDTO } from "../../../types/DTO/ResumeDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";
import { NIL as GuidEmpty } from "uuid";
import { setAreas } from "features/areas/areasSlice";

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
