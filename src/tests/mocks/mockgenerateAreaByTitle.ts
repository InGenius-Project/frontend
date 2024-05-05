import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';

export const mockGenerateAreaByTitle: IResponse<Array<IArea>> = {
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
      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '我要做愛',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 1,
      IsDisplayed: false,
      Title: '教育背景',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生教育背景的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 2,
      IsDisplayed: false,
      Title: '技能專長',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生技能專長的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 3,
      IsDisplayed: false,
      Title: '專案經驗',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生專案經驗的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 4,
      IsDisplayed: false,
      Title: '工作經歷',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生工作經歷的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 5,
      IsDisplayed: false,
      Title: '獲獎紀錄',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生獲獎紀錄的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 6,
      IsDisplayed: false,
      Title: '語言能力',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生語言能力的描述]',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 7,
      IsDisplayed: false,
      Title: '證照資格',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '[根據使用者的資料產生證照資格的描述]',
      },
    },
  ],
};
