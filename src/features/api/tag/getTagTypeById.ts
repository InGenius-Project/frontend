import { IResponse } from '@/types/interfaces/IResponse';
import { ITagTypeDetail } from '@/types/interfaces/ITag';
import { baseApi } from '../baseApi';

export const getTagTypeById = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTagTypeById: builder.query<IResponse<ITagTypeDetail>, string>({
      query(id) {
        return {
          url: `/Tag/type/${id}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, args) => [
        'TagType',
        {
          id: args,
          type: 'TagType',
        },
      ],
    }),
  }),
});

export const { useLazyGetTagTypeByIdQuery, useGetTagTypeByIdQuery } = getTagTypeById;
