import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { RegisterInput } from "pages/Account/Register";
import { getUserApi } from "../user/getUser";
import { TokenDTO } from "types/DTO/TokenDTO";
import { setToken } from "features/user/userSlice";
import { UserRole } from "types/DTO/UserDTO";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      ResponseDTO<TokenDTO>,
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
