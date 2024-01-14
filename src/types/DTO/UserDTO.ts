import { AreaDTO } from "./AreaDTO";
import { TokenDTO } from "./TokenDTO";

export enum UserRole {
  "一般" = 0,
  "公司" = 1,
  "管理者" = 2,
  "內部使用者" = 3,
}

export interface UserDTO {
  User?: UserInfoDTO;
  Token?: TokenDTO;
}

export interface UserInfoDTO {
  Id: string;
  Email: string;
  Username: string;
  Role: UserRole;
  Areas?: Array<AreaDTO> | null;
}

export type UserInfoPostDTO = Pick<UserInfoDTO, "Username" | "Areas">;
