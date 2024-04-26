import { IChatMessage } from '../interfaces/IChat';
import { IOwnerUser } from '../interfaces/IUser';

export class ChatMessage implements IChatMessage {
  Id: string;
  Message: string;
  GroupId: string;
  SenderId: string;
  Sender: IOwnerUser;
  SendTime: string;

  constructor(chatMessage: IChatMessage) {
    this.Id = chatMessage.Id;
    this.Message = chatMessage.Message;
    this.GroupId = chatMessage.GroupId;
    this.SenderId = chatMessage.SenderId;
    this.Sender = chatMessage.Sender;
    this.SendTime = chatMessage.SendTime.endsWith('Z') ? chatMessage.SendTime : chatMessage.SendTime + 'Z';
  }
}
