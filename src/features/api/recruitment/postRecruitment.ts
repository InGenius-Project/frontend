import { IRecruitment, IRecruitmentPost } from "types/interfaces/IRecruitment";
import { IResponse } from "types/interfaces/IResponse";
import { NIL } from "uuid";
import { baseApi } from "../baseApi";
import { getRecruitmentByIdApi } from "./getRecruitmentById";

export const postRecruitment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRecruitment: builder.mutation<
      IResponse<IRecruitment>,
      IRecruitmentPost
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
          { type: "Recruitment", id: res?.result?.Id },
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
                result: {
                  ...(draft.result as IRecruitment),
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
