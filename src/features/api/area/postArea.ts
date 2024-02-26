import { IResponse } from "types/interfaces/IResponse";
import { baseApi } from "../baseApi";
import { IArea, IAreaPost } from "types/interfaces/IArea";
import { setFocusedArea } from "features/areas/areasSlice";

export const postAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postArea: builder.mutation<IResponse<IArea>, IAreaPost>({
      query: (body) => {
        return {
          url: `Area`,
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
        res.data.result && dispatch(setFocusedArea(res.data.result));
      },
    }),
  }),
});

export const { usePostAreaMutation } = postAreaApi;
