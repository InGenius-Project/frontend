import { AreaDTO, ImageTextLayoutDTO, TextLayoutDTO } from "./AreaDTO";

export type ResumeDTO = {
  Id: string;
  Title: string;
  Areas: Array<AreaDTO>;
  ModifiedAt: string;
};

export type ResumePostDTO = {
  Id?: string;
  Title?: string;
  Areas?: Array<AreaDTO>;
};

export interface ResumeAreaDeleteDTO {
  ResumeId: string;
  AreaId: string;
}
