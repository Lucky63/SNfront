import { Data } from "@angular/router";

export class UserPost {
  constructor(
    public id?: number,
    public authorPost?: string,
    public post?: string,
    public timeOfPublication?: Data,
    public likeCounter?: number,
  ) { }

}
