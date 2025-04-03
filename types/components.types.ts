import { Result } from "./TMDB.types";

export interface MovieItemListInstance {
  $el: HTMLUListElement;
  render: (data: Result[]) => void;
}
