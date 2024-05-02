import { IWithAreas } from './IArea';
import { IUserInfo } from './IUser';

export interface IResume extends IWithAreas {
  Title: string;
  ModifiedAt: string;
  Visibility: boolean;
  User: IUserInfo;
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
