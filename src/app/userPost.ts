import { Data } from "@angular/router";

export class UserPost {
  constructor(
    public id?: number,
    public post?: string,
    public timeOfPublication?: Data
  ) { }

}
