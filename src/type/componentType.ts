import { MovieAppData, MovieItem } from "./movieType";

export interface CustomElement extends HTMLElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: <T>(data: T) => void;
  popUp: <T>(data: T) => void;
}
