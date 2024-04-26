import { UserRole } from '@/types/enums/UserRole';
import { IArea, IImageInfo } from './IArea';
import { IToken } from './IToken';
import { ITag } from './ITag';

export interface IUser {
  User?: IUserInfo;
  Token?: IToken;
}

export interface IUserInfo {
  Id: string;
  Email: string;
  Username: string;
  Role: UserRole;
  Areas?: Array<IArea> | null;
  Avatar?: IImageInfo | null;
  Tags?: Array<ITag>;
}

export type IUserInfoPost = Pick<IUserInfo, 'Username' | 'Tags'>;

export interface IOwnerUser extends Pick<IUserInfo, 'Id' | 'Username' | 'Email' | 'Avatar'> {}

type AvatarPostField = 'Image';
export interface AvatarPostFormData extends FormData {
  append(name: AvatarPostField, value: string | Blob, fileName?: string): void;
}
