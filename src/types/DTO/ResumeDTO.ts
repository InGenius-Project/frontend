import { AreaDTO } from "./AreaDTO";

export type ResumeDTO = {
  Id: string;
  Title: string;
  Areas: Array<AreaDTO>;
  ModifiedAt: string;
  Visibility: boolean;
};

export type ResumePostDTO = {
  Id?: string;
  Title?: string;
  Areas?: Array<AreaDTO>;
  Visibility: boolean;
};

export interface ResumeAreaDeleteDTO {
  ResumeId: string;
  AreaId: string;
}
