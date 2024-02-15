import { IArea } from "./IArea";

export interface IResume {
  Id: string;
  Title: string;
  Areas: Array<IArea>;
  ModifiedAt: string;
  Visibility: boolean;
}

export interface IResumePost {
  Id?: string;
  Title?: string;
  Areas?: Array<IArea>;
  Visibility: boolean;
}

export interface IResumeAreaDelete {
  ResumeId: string;
  AreaId: string;
}
