import { Data } from "@angular/router";

export class Message {
  constructor(   
    public userId?: number,
    public friendId?: number,
    public sentMessage?: string,
    public dateTime?:string
  ) { }

}
