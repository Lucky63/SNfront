import { User } from "./user";

export class Friends {
  constructor(
    public friendId?: number,
    public userId?: number,
    
    public id?: number,
    public userName?: string,
    public password?: string,
    public lastName?: string,
    public age?: number,
    public city?: string,
    public avatarImgPath?: string,
    
  ) { }

}
