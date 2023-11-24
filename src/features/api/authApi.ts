import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterInput } from "pages/Account/Register";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import qs from "qs";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { UserDTO } from "types/DTO/UserDTO";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

const customFetchBaseQuery = ({ ...args }: FetchBaseQueryArgs) =>
  fetchBaseQuery({
    ...args,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        // include token in req header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // use repeat format for array search params
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
    responseHandler: async (response) => {
      const text = await response.text();
      let parseResponse: ResponseDTO;
      try {
        parseResponse = JSON.parse(text);
      } catch (error) {
        throw Error(
          `[requestClient] Error parsing response JSON data - ${JSON.stringify(
            error
          )}`
        );
      }

      if (!parseResponse.Success) {
        toast.error(parseResponse.Exception);
      }

      return parseResponse;
    },
  });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: `${BASE_URL}/api/user/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<ResponseDTO<UserDTO>, RegisterInput>({
      query(data) {
        return {
          url: "signup",
          method: "POST",
          body: data,
        };
      },
    }),
    // loginUser: builder.mutation<
    //   { access_token: string; status: string },
    //   UserLogin
    // >({
    //   query(data) {
    //     return {
    //       url: "login",
    //       method: "POST",
    //       body: data,
    //       credentials: "include",
    //     };
    //   },
    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       await dispatch(userApi.endpoints.getMe.initiate(null));
    //     } catch (error) {}
    //   },
    // }),
    // verifyEmail: builder.mutation<any, { verificationCode: string }>({
    //   query({ verificationCode }) {
    //     return {
    //       url: `verifyemail/${verificationCode}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    // logoutUser: builder.mutation<void, void>({
    //   query() {
    //     return {
    //       url: "logout",
    //       credentials: "include",
    //     };
    //   },
    // }),
  }),
});

export const {
  useRegisterUserMutation,
  // useLoginUserMutation,
  // useLogoutUserMutation,
  // useVerifyEmailMutation,
} = authApi;
