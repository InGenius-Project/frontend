import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";

export const getResumesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<ResponseDTO<Array<ResumeDTO>>, null>({
      query() {
        return {
          url: "Resume",
          method: "Get",
        };
      },
      providesTags: () => {
        return ["Resume", "ResumeLists"];
      },
    }),
  }),
});

export const { useGetResumesQuery } = getResumesApi;
