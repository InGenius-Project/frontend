import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";

export const getUserResume = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResume: builder.query<ResponseDTO<Array<ResumeDTO>>, null>({
      query() {
        return {
          url: "Resume",
          method: "Get",
        };
      },
    }),
    postResume: builder.mutation<ResponseDTO<null>, ResumeDTO>({
      query(body) {
        return {
          url: "Resume",
          method: "Post",
          body,
        };
      },
    }),
  }),
});

export const { useGetResumeQuery, usePostResumeMutation } = getUserResume;
