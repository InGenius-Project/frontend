import { IArea } from './IArea';
import { IResume } from './IResume';
import { IOwnerUser } from './IUser';

export interface IRecruitment {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas?: IArea[];
  Resumes?: IResume[];
  Publisher?: IOwnerUser;
  PublisherId?: string;
  IsUserFav?: boolean;
}

export interface IRecruitmentPost {
  Id: string;
  Name: string;
  Enable: boolean;
}

export interface IRecruitmentApplyPost {
  RecruitmentId: string;
  ResumeId: string;
}

export enum SearchSortBy {
  CreatedTime = 'CreatedTime',
}

export enum SearchOrderBy {
  Desc = 'desc',
  Asc = 'asc',
}

export interface IRecruitmentSearchPost {
  Query?: string;
  TagIds?: string[];
  Page: number;
  PageSize: number;
  SortBy: SearchSortBy;
  OrderBy: SearchOrderBy;
}

export interface IRecruitmentSearchResult {
  Query?: string;
  TagIds?: string[];
  Page: number;
  PageSize: number;
  MaxPage: number;
  Total: number;
  SortBy: string;
  OrderBy: string;
  result: IRecruitment[];
}
