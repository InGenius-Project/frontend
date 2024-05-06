import { IResponse } from '@/types/interfaces/IResponse';
import { baseApi } from '../baseApi';
import { AreaGenType, IArea, IWithAreas } from '@/types/interfaces/IArea';
import { store } from '@/features/store';
import { NIL } from 'uuid';

export const pushEmptyAreasContianerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    pushEmptyAreasContainer: builder.mutation<IResponse<IWithAreas>, AreaGenType>({
      query: (type) => {
        const state = store.getState();

        if (type === AreaGenType.Resume) {
          return {
            url: 'Resume',
            body: {
              Id: NIL,
              Title: `${state.userState.User?.Username}的履歷`,
              Visibility: false,
            },
            method: 'POST',
          };
        } else {
          return {
            url: 'Recruitment',
            body: {
              Id: NIL,
              Name: `${state.userState.User?.Username}的職缺`,
              Enable: false,
            },
            method: 'POST',
          };
        }
      },
    }),
  }),
});

export const { usePushEmptyAreasContainerMutation } = pushEmptyAreasContianerApi;
