import { Friends } from "./friends";
import { Photos } from "./photos";

export class User {
  constructor(
    public id?: number,
    public userName?: string,
    public password?: string,
    public lastName?: string,
    public age?: number,
    public city?: string,
    public avatarImgPath?: string,
    public photos?: Photos[],
    public friends?: Friends[],
  ) { }
  
}
