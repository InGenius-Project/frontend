import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { UserInfoDTO } from "types/DTO/UserDTO";
import { setUserInfo } from "features/user/userSlice";
import { setAreas } from "features/areas/areasSlice";

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
      transformResponse: (response: ResponseDTO<UserInfoDTO>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.Data && response.Data.Areas) {
          const orderedArea = response.Data.Areas.sort(
            (a, b) => a.Sequence - b.Sequence
          );
          return {
            ...response,
            Data: {
              ...response.Data,
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

export const { useGetUserQuery } = getUserApi;
