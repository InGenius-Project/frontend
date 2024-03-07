import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { IUserInfo, IUserInfoPost } from "types/interfaces/IUser";
import { getUserApi } from "./getUser";

export const postUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<IResponse<IUserInfo>, IUserInfoPost>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      onQueryStarted: (request, { dispatch }) => {
        // optimistic update to prvent flicking Area
        dispatch(
          getUserApi.util.updateQueryData("getUser", null, (draft) => {
            return {
              ...draft,
              result: {
                ...(draft.result as IUserInfo),
                Areas: request.Areas || [],
              },
            };
          })
        );
      },
    }),
  }),
});

export const { usePostUserMutation } = postUserApi;
