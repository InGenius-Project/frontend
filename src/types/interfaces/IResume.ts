import { IArea } from './IArea';
import { IUserInfo } from './IUser';

export interface IResume {
  Id: string;
  Title: string;
  Areas: Array<IArea>;
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
