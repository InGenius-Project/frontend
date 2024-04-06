import { IArea } from './IArea';
import { IResume } from './IResume';
import { IOwnerUser } from './IUser';

export interface IOwnerRecruitment {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas?: IArea[];
  Resumes?: IResume[];
  Publisher?: IOwnerUser;
  PublisherId?: string;
}

export interface IRecruitment extends Pick<IOwnerRecruitment, 'Id' | 'Name' | 'Areas'> {}

export interface IRecruitmentPost {
  Id: string;
  Name: string;
  Enable: boolean;
}
