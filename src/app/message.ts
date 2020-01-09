import { Data } from "@angular/router";

export class Message {
  constructor(   
    public sender?: number,
    public recipient?: number,
    public sentMessage?: string,
    public dateSent?:Data
  ) { }

}
