import { TokenDTO } from "./TokenDTO";

export interface UserDTO {
  user: UserInfoDTO;
  token: TokenDTO;
}

export interface UserInfoDTO {
  id: string;
  email: string;
  username: string;
}
