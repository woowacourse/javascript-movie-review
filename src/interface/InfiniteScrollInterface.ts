export interface InfiniteScrollParams {
  targetElement: HTMLElement;
  callbackFunction: () => void;
  options?: IntersectionObserverInit;
}
