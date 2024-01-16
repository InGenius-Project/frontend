import { AreaDTO } from "./AreaDTO";
import { TokenDTO } from "./TokenDTO";

export enum UserRole {
  "INTERN" = 0,
  "COMPANY" = 1,
  "ADMIN" = 2,
  "INTERNALUSER" = 3,
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
