import { ResumePostDTO } from "./../../../types/DTO/ResumeDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<ResponseDTO<Array<ResumeDTO>>, null>({
      query() {
        return {
          url: "Resume",
          method: "Get",
        };
      },
      providesTags: () => {
        return ["Resume", "ResumeLists"];
      },
    }),
    postResume: builder.mutation<ResponseDTO<ResumeDTO>, ResumePostDTO>({
      query(body) {
        return {
          url: "Resume",
          method: "Post",
          body,
        };
      },
      invalidatesTags: (res) => {
        return [{ type: "ResumeLists" }, { type: "Resume", id: res?.Data?.Id }];
      },
    }),
    getResumeById: builder.query<ResponseDTO<ResumeDTO>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "Get",
        };
      },
      providesTags: (result) => {
        return [{ type: "Resume", id: result?.Data?.Id }];
      },
    }),
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

export const {
  useGetResumesQuery,
  usePostResumeMutation,
  useGetResumeByIdQuery,
  useLazyGetResumeByIdQuery,
  useDeleteResumeMutation,
} = resumeApi;
