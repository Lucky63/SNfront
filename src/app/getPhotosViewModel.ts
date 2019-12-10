import { Photos } from "./photos";

export class GetPhotosViewModel {
  constructor(
    public photos: Photos[] = [],
    public count?: number,
  ) { }

}
