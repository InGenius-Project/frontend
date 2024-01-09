import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { UserInfoDTO } from "types/DTO/UserDTO";
import { setUserInfo } from "features/user/userSlice";

export const getUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ResponseDTO<UserInfoDTO>, null>({
      query: () => ({
        url: "/user",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          data.Data && dispatch(setUserInfo(data.Data));
        } catch (error) {}
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = getUserApi;
