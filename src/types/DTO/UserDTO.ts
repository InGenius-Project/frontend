import { AreaDTO, ImageDTO } from "./AreaDTO";
import { TokenDTO } from "./TokenDTO";

export enum UserRole {
  "Intern" = 0,
  "Company" = 1,
  "Admin" = 2,
  "InternalUser" = 3,
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
  Avatar?: ImageDTO;
  Areas?: Array<AreaDTO> | null;
}

export type UserInfoPostDTO = Pick<
  UserInfoDTO,
  "Username" | "Areas" | "Avatar"
>;
