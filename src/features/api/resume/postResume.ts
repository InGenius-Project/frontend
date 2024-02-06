import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO, ResumePostDTO } from "types/DTO/ResumeDTO";
import { getResumeByIdApi } from "./getResumeById";
import { NIL } from "uuid";

export const postResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postResume: builder.mutation<
      ResponseDTO<ResumeDTO>,
      Partial<ResumePostDTO>
    >({
      query(body) {
        return {
          url: "Resume",
          method: "Post",
          body,
        };
      },
      invalidatesTags: (res) => {
        return [
          { type: "ResumeLists" },
          { type: "Resume", id: res?.result?.Id },
        ];
      },
      onQueryStarted: ({ Id, ...body }, { dispatch }) => {
        // optimistic update to prvent flicking Area
        dispatch(
          getResumeByIdApi.util.updateQueryData(
            "getResumeById",
            Id || NIL,
            (draft) => {
              return {
                ...draft,
                result: {
                  ...(draft.result as ResumeDTO),
                  Areas: body.Areas || [],
                },
              };
            }
          )
        );
      },
    }),
  }),
});

export const { usePostResumeMutation } = postResumeApi;
