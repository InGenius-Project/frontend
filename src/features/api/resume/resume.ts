import { TextLayoutDTO } from "./../../../types/DTO/ResumeDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeAreaPostDTO, ResumeDTO } from "types/DTO/ResumeDTO";

export const getUserResume = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<ResponseDTO<Array<ResumeDTO>>, null>({
      query() {
        return {
          url: "Resume",
          method: "Get",
        };
      },
    }),
    postResume: builder.mutation<ResponseDTO<null>, ResumeDTO>({
      query(body) {
        return {
          url: "Resume",
          method: "Post",
          body,
        };
      },
    }),
    getResumeById: builder.query<ResponseDTO<ResumeDTO>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "Get",
        };
      },
    }),
    postResumeArea: builder.mutation<ResponseDTO<null>, ResumeAreaPostDTO>({
      query(req) {
        return {
          url: `Resume/${req.ResumeId}/Area`,
          method: "POST",
          body: {
            TextLayout: req.TextLayout,
            ImageTextLayout: req.ImageTextLayout,
          },
        };
      },
    }),
  }),
});

export const {
  useGetResumesQuery,
  usePostResumeMutation,
  usePostResumeAreaMutation,
  useGetResumeByIdQuery,
} = getUserResume;
