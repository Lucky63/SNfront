import { Data } from "@angular/router";
export class Photos {
  constructor(    
    public id?: number,
    public authorPost?: string,
    public photoPath?: string,
    public timeOfPublication?: Data,
    public likeCounter?:number,
  ) { }

}
