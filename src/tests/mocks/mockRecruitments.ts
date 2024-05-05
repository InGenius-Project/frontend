import { UserRole } from '@/types/enums/UserRole';
import { IRecruitment } from '@/types/interfaces/IRecruitment';
import { IResponse } from '@/types/interfaces/IResponse';

export const mockRecruitments: IResponse<IRecruitment[]> = {
  statusCode: 200,
  message: 'Success',
  result: [
    {
      Id: '7d1ca778-3c7a-4749-8512-2b157e51f887',
      Name: 'Company的職缺',
      Enable: false,
      Areas: [],
      Resumes: [
        {
          Id: 'resume-id',
          Title: 'Resume Title',
          ModifiedAt: '2022-01-01',
          Visibility: true,
          User: {
            Id: 'user-id',
            Username: 'User Name',
            Email: 'user@example.com',
            Role: UserRole.Intern,
          },
        },
      ],
      Publisher: {
        Id: 'cde5bbdd-736c-458f-8288-54e5dca0bc9b',
        Email: 'c@gmail.com',
        Username: 'Company',
        Avatar: null,
      },
      PublisherId: 'cde5bbdd-736c-458f-8288-54e5dca0bc9b',
      IsUserFav: false,
      Keywords: [],
    },
  ],
};
