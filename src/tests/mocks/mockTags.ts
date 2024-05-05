import { TagType } from '@/types/enums/TagType';
import { IResponse } from '@/types/interfaces/IResponse';
import { ITag } from '@/types/interfaces/ITag';

export const mockTags: IResponse<ITag[]> = {
  statusCode: 200,
  message: '',
  isError: false,
  responseException: undefined,
  result: [
    {
      Id: '3',
      Name: '大學部門3',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '4',
      Name: '大學部門4',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '5',
      Name: '大學部門5',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '6',
      Name: '大學部門6',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '7',
      Name: '大學部門7',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '8',
      Name: '大學部門8',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '9',
      Name: '大學部門9',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
    {
      Id: '10',
      Name: '大學部門10',
      Type: {
        Id: parseInt(TagType.Department),
        Name: '大學部門',
        Value: 'university_department',
        Color: '#000000',
      },
    },
  ],
};
