import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaDTO, AreaPostDTO } from "types/DTO/AreaDTO";
import { setFocusedAreaDTO } from "features/layout/layoutSlice";

export const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreaById: builder.query<ResponseDTO<AreaDTO>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Area", id: result?.Data?.Id }];
      },
    }),
    postArea: builder.mutation<ResponseDTO<AreaDTO>, AreaPostDTO>({
      query: (body) => {
        return {
          url: `Area/${body.Id ? body.Id : ""}`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Resume", id: arg.ResumeId },
          { type: "Area", id: arg.Id },
        ];
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const res = await queryFulfilled;
        res.data.Data && dispatch(setFocusedAreaDTO(res.data.Data));
      },
    }),
    deleteArea: builder.mutation<ResponseDTO<null>, string>({
      query(areaId) {
        return {
          url: `Area/${areaId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resume"],
    }),
  }),
});

export const {
  useGetAreaByIdQuery,
  useDeleteAreaMutation,
  usePostAreaMutation,
} = areaApi;
