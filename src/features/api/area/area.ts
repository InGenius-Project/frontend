import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaDTO, AreaPostDTO } from "types/DTO/AreaDTO";

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
      query(body) {
        return {
          url: `Area/${body.Id ? body.Id : ""}`,
          method: "POST",
          body,
        };
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {}
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: "Resume", id: arg.ResumeId },
          { type: "Area", id: arg.Id },
        ];
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
