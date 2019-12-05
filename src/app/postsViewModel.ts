import { User } from "./user";

export class PostsViewModel {
  constructor(
    public userPostViewModels: User[]=[],
    public count?: number,
  ) { }

}
