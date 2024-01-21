import { RecruitmentDTO, RecruitmentPostDTO } from "types/DTO/RecruitmentDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { NIL } from "uuid";
import { baseApi } from "../baseApi";
import { getRecruitmentByIdApi } from "./getRecruitmentById";

export const postRecruitment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRecruitment: builder.mutation<
      ResponseDTO<RecruitmentDTO>,
      RecruitmentPostDTO
    >({
      query(body) {
        return {
          url: "Recruitment",
          method: "Post",
          body,
        };
      },
      invalidatesTags: (res) => {
        return [
          { type: "RecruitmentLists" },
          { type: "Recruitment", id: res?.Data?.Id },
        ];
      },
      onQueryStarted: ({ Id, ...body }, { dispatch }) => {
        // optimistic update to prevent flicking Area
        dispatch(
          getRecruitmentByIdApi.util.updateQueryData(
            "getRecruitmentById",
            Id || NIL,
            (draft) => {
              return {
                ...draft,
                Data: {
                  ...(draft.Data as RecruitmentDTO),
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

export const { usePostRecruitmentMutation } = postRecruitment;
