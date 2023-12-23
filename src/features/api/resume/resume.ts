import { ResumePostDTO } from "./../../../types/DTO/ResumeDTO";
import { ResponseDTO } from "types/DTO/ResponseDTO";
import { baseApi } from "../baseApi";
import { ResumeDTO } from "types/DTO/ResumeDTO";
import { setFocusedIndex } from "features/layout/layoutSlice";
import { GuidEmpty } from "assets/utils/guid";

export const resumeApi = baseApi.injectEndpoints({
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
    getResumeById: builder.query<ResponseDTO<ResumeDTO>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "Get",
        };
      },
      providesTags: (result) => {
        return [{ type: "Resume", id: result?.Data?.Id }];
      },
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data: res } = await queryFulfilled;

          if (res && res.Data) {
            const { Areas } = res.Data;

            if (Areas && Areas.length > 0) {
              // Extract the sequence numbers from each area
              const sequenceNumbers = Areas.map((area) => area.Sequence);

              // Find the max sequence number
              const maxSequenceNumber = Math.max(...sequenceNumbers);
              dispatch(setFocusedIndex(maxSequenceNumber));
            }
          }
        } catch (error) {}
      },
      transformResponse: (response: ResponseDTO<ResumeDTO>, meta, arg) => {
        // Reorder the areas by sequence
        if (response.Data) {
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
    }),
    postResume: builder.mutation<ResponseDTO<ResumeDTO>, ResumePostDTO>({
      query(body) {
        return {
          url: "Resume",
          method: "Post",
          body,
        };
      },
      invalidatesTags: (res) => {
        return [{ type: "ResumeLists" }, { type: "Resume", id: res?.Data?.Id }];
      },
      onQueryStarted: ({ Id, ...body }, { dispatch }) => {
        dispatch(
          resumeApi.util.updateQueryData(
            "getResumeById",
            Id || GuidEmpty,
            (draft) => {
              return {
                ...draft,
                Data: {
                  ...(draft.Data as ResumeDTO),
                  Areas: body.Areas || [],
                },
              };
            }
          )
        );
      },
    }),
    deleteResume: builder.mutation<ResponseDTO<null>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ResumeLists"],
    }),
  }),
});

export const {
  useGetResumesQuery,
  usePostResumeMutation,
  useGetResumeByIdQuery,
  useLazyGetResumeByIdQuery,
  useDeleteResumeMutation,
} = resumeApi;
