import { IArea } from "./IArea";
import { IResume } from "./IResume";
import { IUser } from "./IUser";

export interface IRecruitment {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas: IArea[];
  Resumes: IResume[];
  Publisher: IUser;
  PublisherId: string;
}

export interface IRecruitmentPost {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas: IArea[];
}
