import { ModelData, Movie } from "./movieType";

export interface CustomElement extends HTMLElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: (data: ModelData, isShowMore?: boolean) => void;
}
