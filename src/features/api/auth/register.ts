import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { RegisterInput } from "pages/Account/Register";
import { getUserApi } from "../user/getUser";
import { IToken } from "types/interfaces/IToken";
import { setToken } from "features/user/userSlice";
import { UserRole } from "types/enums/UserRole";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      IResponse<IToken>,
      RegisterInput & { Role: UserRole }
    >({
      query(data) {
        return {
          url: "/user/signup",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.result) {
            dispatch(setToken(data.result));
            localStorage.setItem("accessToken", data.result.AccessToken);
          }

          dispatch(
            getUserApi.endpoints.getUser.initiate(null, {
              forceRefetch: true,
            })
          );
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation } = registerApi;
