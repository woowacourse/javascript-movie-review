export interface CustomElement {
  connectedCallback: () => void;
  render: () => void;
  template: () => string;
  setEvent: () => void;
  rerender: <T>(data: T) => void;
}

export interface MovieElement extends CustomElement {
  rerender: <T>(data: T, isShowMore?: boolean) => void;
}

export interface SkeletonElement extends CustomElement {
  removeSkeleton: () => void;
}
