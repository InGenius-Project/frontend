import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { LoginInput } from "pages/Account/Login";
import { IToken } from "types/interfaces/IToken";
import { getUserApi } from "../user/getUser";
import { setToken } from "features/user/userSlice";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<IToken>, LoginInput>({
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
          data.result && dispatch(setToken(data.result));
          data.result &&
            localStorage.setItem("accessToken", data.result.AccessToken);

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
