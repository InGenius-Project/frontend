import { IChatGroup } from '@/types/interfaces/IChat';
import { IResponse } from '@/types/interfaces/IResponse';

export const generateChatGroup: IResponse<IChatGroup> = {
  statusCode: 200,
  message: 'GET Request successful.',
  isError: false,
  result: {
    Id: '66401937-aefe-4d5f-a42f-d90801ef9885',
    GroupName: 'TEST',
    IsPrivate: true,
    CreateTime: '2024-04-25T04:34:09.7526983',
    Users: [
      {
        Id: '403d6374-4575-45f9-8685-81075fea23e2',
        Email: 'user@gmail.com',
        Username: 'User',
        Avatar: null,
      },
      {
        Id: '123',
        Email: 'user@gmail.com',
        Username: '123ser',
        Avatar: null,
      },
    ],
    Owner: {
      Id: '403d6374-4575-45f9-8685-81075fea23e2',
      Email: 'user@gmail.com',
      Username: 'User',
      Avatar: null,
    },
    Description: null,
    InvitedUsers: [],
  },
};
