import { setUserInfo } from "features/user/userSlice";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { UserInfoDTO } from "types/DTO/UserDTO";
import { baseApi } from "../baseApi";

export const getUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ResponseDTO<UserInfoDTO>, null>({
      query: () => ({
        url: "/user",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          data.result && dispatch(setUserInfo(data.result));
        } catch (error) {}
      },
      transformResponse: (response: ResponseDTO<UserInfoDTO>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.result && response.result.Areas) {
          const orderedArea = response.result.Areas.sort(
            (a, b) => a.Sequence - b.Sequence
          );
          return {
            ...response,
            result: {
              ...response.result,
              Areas: orderedArea,
            },
          };
        }
        return response;
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, usePrefetch } = getUserApi;
