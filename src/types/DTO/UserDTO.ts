import { AreaDTO, ImageDTO } from "./AreaDTO";
import { TokenDTO } from "./TokenDTO";

export enum UserRole {
  Intern,
  Company,
  Admin,
  InternalUser,
}

export const UserRoleObject = [
  {
    label: "實習生",
    value: UserRole.Intern,
  },
  {
    label: "公司",
    value: UserRole.Company,
  },
  {
    label: "管理員",
    value: UserRole.Admin,
  },
  {
    label: "內部使用者",
    value: UserRole.InternalUser,
  },
];

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
