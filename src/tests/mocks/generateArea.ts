import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';

export const generateArea: IResponse<Array<IArea>> = {
  statusCode: 200,
  message: 'POST Request successful.',
  isError: false,
  result: [
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '自我簡介',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生自我簡介的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '工作經驗',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生工作經驗的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '專案經歷',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生專案經歷的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '證照與認證',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生證照與認證的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '社群貢獻',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生社群貢獻的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '興趣與愛好',
      LayoutType: 0,
      AreaTypeId: undefined,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '根據使用者的資料產生興趣與愛好的描述 ',
      },
      ImageTextLayout: undefined,
      ListLayout: undefined,
      KeyValueListLayout: undefined,
      ResumeId: undefined,
      RecruitmentId: undefined,
      UserId: undefined,
    },
  ],
};
