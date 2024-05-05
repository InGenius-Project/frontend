import { IArea } from '@/types/interfaces/IArea';
import { IResponse } from '@/types/interfaces/IResponse';

export const mockGenerationArea: IResponse<Array<IArea>> = {
  statusCode: 200,
  message: 'POST Request successful.',
  isError: false,
  result: [
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 0,
      IsDisplayed: false,
      Title: '自我介紹',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
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
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 2,
      IsDisplayed: false,
      Title: '工作經驗',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 3,
      IsDisplayed: false,
      Title: '專案經歷',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 4,
      IsDisplayed: false,
      Title: '專業技能',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 5,
      IsDisplayed: false,
      Title: '語言能力',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 6,
      IsDisplayed: false,
      Title: '證照資格',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      Sequence: 7,
      IsDisplayed: false,
      Title: '自我評價',
      LayoutType: 0,

      TextLayout: {
        Id: '00000000-0000-0000-0000-000000000000',
        Content: '',
      },
    },
  ],
};
