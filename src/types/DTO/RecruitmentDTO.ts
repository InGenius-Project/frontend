import { AreaDTO } from "./AreaDTO";
import { ResumeDTO } from "./ResumeDTO";
import { UserDTO } from "./UserDTO";

export interface RecruitmentDTO {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas: AreaDTO[];
  Resumes: ResumeDTO[];
  Publisher: UserDTO;
  PublisherId: string;
}

export interface RecruitmentPostDTO {
  Id: string;
  Name: string;
  Enable: boolean;
  Areas: AreaDTO[];
}
