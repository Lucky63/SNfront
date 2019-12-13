import { User } from "./user";

export class GetUserFriendsViewModel {
  constructor(
    public friends: User[] = [],
    public count?: number,
  ) { }

}
