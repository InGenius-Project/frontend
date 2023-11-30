import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { LoginInput } from "pages/Account/Login";
import { TokenDTO } from "types/DTO/TokenDTO";
import { getUserApi } from "../user/getUser";
import { setToken } from "features/user/userSlice";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseDTO<TokenDTO>, LoginInput>({
      query(data) {
        return {
          url: "user/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          data.Data && dispatch(setToken(data.Data));
          data.Data &&
            localStorage.setItem("accessToken", data.Data.accessToken);

          dispatch(
            getUserApi.endpoints.getUser.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
