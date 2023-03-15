import { MovieItem } from "./MovieItem";

export default class MovieItemList {
  private _movieItems: any;
  private _currentPage: number;

  constructor(movieInfo: any) {
    this._movieItems = movieInfo;
    this._currentPage = 1;
  }

  create() {
    return `<ul class="item-list">${this._movieItems}</ul>`;
  }
}
