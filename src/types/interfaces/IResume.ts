import { IWithAreas } from './IArea';
import { IRecruitment } from './IRecruitment';
import { IUserInfo } from './IUser';

export interface IResume extends IWithAreas {
  Title: string;
  ModifiedAt: string;
  Visibility: boolean;
  User: IUserInfo;
  Recruitments?: IRecruitment[];
  Keywords?: [
    {
      Id: string;
    },
  ];
}

export interface IResumePost {
  Id?: string;
  Title?: string;
  Visibility: boolean;
}

export interface IResumeAreaDelete {
  ResumeId: string;
  AreaId: string;
}
