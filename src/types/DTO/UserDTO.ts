import { AreaDTO } from "./AreaDTO";
import { TokenDTO } from "./TokenDTO";

export interface UserDTO {
  User?: UserInfoDTO;
  Token?: TokenDTO;
}

export interface UserInfoDTO {
  Id: string;
  Email: string;
  Username: string;
  Areas?: Array<AreaDTO> | null;
}

export type UserInfoPostDTO = Pick<UserInfoDTO, "Username" | "Areas">;
