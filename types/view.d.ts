interface MovieListViewType {
  setTitle(title: string): void;
  render(movieList: Movies[]): void;
  emptyRender(): void;
  errorRender(message: string): void;
  skeletonRender(count?: number): void;
  skeletonRemover(): void;
  reset(): void;
}

interface MovieBannerViewType {
  render(bannerMovie: Movies): void;
  hide(): void;
}

interface AddButtonViewType {
  show(): void;
  hide(): void;
}

interface ModalViewType {
  open(): void;
  close(): void;
  render(item: MovieItem, count: number): void;
  renderRate(rate: number);
  showToast(message: string);
  spinnerRender(): void;
  errorRender(message: string): void;
}

interface InfiniteScrollViewType {
  start(): void;
  stop(): void;
}
