import { MovieAppData, IMovie } from "./movieType";

export interface CustomElement extends HTMLElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: (data: MovieAppData, isShowMore?: boolean) => void;
}
