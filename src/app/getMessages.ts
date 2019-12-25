import { Message } from "./message";

export class GetMessages {
  constructor(
    public senderName?: string,
    public recipientName?:string,
    public messages: Message[] = [],
    public count?: number,
  ) { }

}
