export interface CustomElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: <T>(data: T, isShowMore?: boolean) => void;
}
