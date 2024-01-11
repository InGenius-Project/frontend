import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { UserInfoDTO, UserInfoPostDTO } from "types/DTO/UserDTO";
import { getUserApi } from "./getUser";

export const postUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<ResponseDTO<UserInfoDTO>, UserInfoPostDTO>({
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
              Data: {
                ...(draft.Data as UserInfoDTO),
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
