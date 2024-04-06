import { IResponse } from '@/types/interfaces/IResponse';
import { IResume, IResumePost } from '@/types/interfaces/IResume';
import { baseApi } from '../baseApi';

export const postResumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postResume: builder.mutation<IResponse<IResume>, Partial<IResumePost>>({
      query(body) {
        return {
          url: 'Resume',
          method: 'Post',
          body,
        };
      },
      invalidatesTags: (res) => {
        return [{ type: 'Resume' }, { type: 'Resume', id: res?.result?.Id }];
      },
    }),
  }),
});

export const { usePostResumeMutation } = postResumeApi;
