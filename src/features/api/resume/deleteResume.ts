import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { result } from 'lodash';

export const deleteResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteResume: builder.mutation<IResponse<null>, string>({
      query(id) {
        return {
          url: `Resume/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        {
          type: 'Resume',
          id: arg,
        },
      ],
    }),
  }),
});

export const { useDeleteResumeMutation } = deleteResumeApi;
