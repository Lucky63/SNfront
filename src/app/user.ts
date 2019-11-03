import { Friends } from "./friends";

export class User {
  constructor(
    public id?: number,
    public userName?: string,
    public password?: string,
    public lastName?: string,
    public friends?: Friends[],
  ) { }
  
}
