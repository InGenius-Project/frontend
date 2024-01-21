import { baseApi } from "../baseApi";

export const deleteRecruitmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteRecruitment: builder.mutation({
            query(id) {
                return {
                    url: `Recruitment/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["RecruitmentLists"],
        }),
    }),
});

export const { useDeleteRecruitmentMutation } = deleteRecruitmentApi;
