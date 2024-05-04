import getTimeDiffer from '@/assets/utils/getTimeDiffer';
import { IChatMessage } from '../interfaces/IChat';
import { IOwnerUser } from '../interfaces/IUser';

export class ChatMessage implements IChatMessage {
  Id: string;
  Message: string;
  GroupId: string;
  SenderId: string;
  Sender: IOwnerUser;
  SendTime: string;
  SendTimeDate: Date;

  constructor(chatMessage: IChatMessage) {
    this.Id = chatMessage.Id;
    this.Message = chatMessage.Message;
    this.GroupId = chatMessage.GroupId;
    this.SenderId = chatMessage.SenderId;
    this.Sender = chatMessage.Sender;
    this.SendTime = chatMessage.SendTime;
    this.SendTimeDate = new Date(chatMessage.SendTime);
  }

  public getTimeDiffer(): string {
    return getTimeDiffer(this.SendTime);
  }

  public compareSendTime(other: ChatMessage): number {
    return this.SendTimeDate.getTime() - other.SendTimeDate.getTime();
  }
}
