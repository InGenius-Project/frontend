import { TokenDTO } from "./TokenDTO";

export interface UserDTO {
  User?: UserInfoDTO;
  Token?: TokenDTO;
}

export interface UserInfoDTO {
  Id: string;
  Email: string;
  Username: string;
}

export type UserInfoPostDTO = Pick<UserInfoDTO, "Username">;
