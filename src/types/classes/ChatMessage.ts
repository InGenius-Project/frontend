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
    this.SendTime = chatMessage.SendTime.endsWith('Z') ? chatMessage.SendTime : chatMessage.SendTime + 'Z';
    this.SendTimeDate = new Date(this.SendTime);
  }

  public getTimeDiffer(): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - this.SendTimeDate.getTime()) / 1000 / 60); // difference in minutes

    if (diff < 1) {
      return '1分鐘前';
    } else if (diff < 60) {
      return `${diff}分鐘前`;
    } else if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return `${hours}小時前`;
    } else {
      const year = this.SendTimeDate.getFullYear();
      const month = this.SendTimeDate.getMonth() + 1;
      const day = this.SendTimeDate.getDate();
      return `${year}/${month}/${day}`;
    }
  }

  public compareSendTime(other: ChatMessage): number {
    return this.SendTimeDate.getTime() - other.SendTimeDate.getTime();
  }
}
