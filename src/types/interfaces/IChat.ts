import { IOwnerUser } from './IUser';

export interface IChat {
  role: string;
  content: string;
}

export interface IChatGroupInfo {
  Id: string;
  GroupName: string;
  IsPrivate: boolean;
  CreateTime: string;
  Users: Array<IOwnerUser>;
  Owner: IOwnerUser;
  Description?: string | null;
  InvitedUsers: Array<IOwnerUser>;
}

export interface IChatGroup extends IChatGroupInfo {
  Messages?: Array<IChatMessage>;
}

export interface IChatMessage {
  Id: string;
  Message: string;
  GroupId: string;
  SenderId: string;
  Sender: IOwnerUser;
  SendTime: string;
}
