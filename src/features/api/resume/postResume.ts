import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { IResume, IResumePost } from "types/interfaces/IResume";
import { getResumeByIdApi } from "./getResumeById";
import { NIL } from "uuid";

export const postResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postResume: builder.mutation<IResponse<IResume>, Partial<IResumePost>>({
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
                  ...(draft.result as IResume),
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
