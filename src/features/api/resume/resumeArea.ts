import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeAreaDeleteDTO, ResumeAreaPostDTO } from "types/DTO/ResumeDTO";

export const resumeAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {}
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Resume", id: arg.ResumeId }];
      },
    }),
    deleteResumeArea: builder.mutation<ResponseDTO<null>, ResumeAreaDeleteDTO>({
      query(req) {
        return {
          url: `Resume/${req.ResumeId}/Area/${req.AreaId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Resume", id: arg.ResumeId }];
      },
    }),
  }),
});

export const { usePostResumeAreaMutation, useDeleteResumeAreaMutation } =
  resumeAreaApi;
