import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { UserInfoDTO, UserInfoPostDTO } from "types/DTO/UserDTO";
import { setUserInfo } from "features/user/userSlice";

export const getUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<ResponseDTO<UserInfoDTO>, UserInfoPostDTO>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { usePostUserMutation } = getUserApi;
