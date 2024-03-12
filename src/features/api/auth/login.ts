import { setToken } from '@/features/user/userSlice';
import { LoginInput } from '@/pages/Account/Login';
import { IResponse } from '@/types/interfaces/IResponse';
import { IToken } from '@/types/interfaces/IToken';
import { baseApi } from '../baseApi';
import { getUserApi } from '../user/getUser';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<IToken>, LoginInput>({
      query(data) {
        return {
          url: 'user/login',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          data.result && dispatch(setToken(data.result));
          data.result && localStorage.setItem('accessToken', data.result.AccessToken);

          dispatch(
            getUserApi.endpoints.getUser.initiate(null, {
              forceRefetch: true,
            }),
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
