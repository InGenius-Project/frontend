import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { AreaDTO, AreaPostDTO } from "types/DTO/AreaDTO";
import { setFocusedArea } from "features/areas/areasSlice";

export const postAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postArea: builder.mutation<ResponseDTO<AreaDTO>, AreaPostDTO>({
      query: ({ Id, ...body }) => {
        return {
          url: `Area/${Id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Resume" }, { type: "Area", id: arg.Id }, "User"];
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // set focused Area to new posted area
        const res = await queryFulfilled;
        res.data.Data && dispatch(setFocusedArea(res.data.Data));
      },
    }),
  }),
});

export const { usePostAreaMutation } = postAreaApi;
