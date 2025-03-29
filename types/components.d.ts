import { Result } from "./TMDB";

export interface MovieItemListInstance {
  $el: HTMLUListElement;
  render: (data: Result[]) => void;
}
