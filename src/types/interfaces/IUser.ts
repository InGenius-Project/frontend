import { UserRole } from "types/enums/UserRole";
import { IArea, IImage } from "./IArea";
import { IToken } from "./IToken";

export interface IUser {
  User?: IUserInfo;
  Token?: IToken;
}

export interface IUserInfo {
  Id: string;
  Email: string;
  Username: string;
  Role: UserRole;
  Avatar?: IImage;
  Areas?: Array<IArea> | null;
}

export type IUserInfoPost = Pick<IUserInfo, "Username" | "Areas" | "Avatar">;
