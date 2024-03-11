import { ResponseDTO } from "@/types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { RecruitmentDTO } from "@/types/DTO/RecruitmentDTO";

export const getRecruitmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruitments: builder.query<ResponseDTO<Array<RecruitmentDTO>>, null>({
      query() {
        return {
          url: "Recruitment",
          method: "Get",
        };
      },
      providesTags: () => {
        return ["Recruitment", "RecruitmentLists"];
      },
    }),
  }),
});

export const { useGetRecruitmentsQuery } = getRecruitmentsApi;
