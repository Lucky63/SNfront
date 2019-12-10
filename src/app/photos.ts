import { Data } from "@angular/router";
export class Photos {
  constructor(    
    public id?: number,
    public authorPost?: string,
    public path?: string,
    public timeOfPublication?: Data,
    public likeCounter?:number,
  ) { }

}
