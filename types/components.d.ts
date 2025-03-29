import { Result } from "./TMDB";

export interface MovieItemListInstance {
  $el: HTMLUListElement;
  render: (data: Result[]) => void;
}

export interface LoadMoreButtonInstance {
  $el: HTMLButtonElement;
  hide: () => void;
  setOnClick: (callback: () => void) => void;
}
