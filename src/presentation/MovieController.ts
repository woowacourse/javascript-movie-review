import { MovieBrowser } from '../domain/MovieBrowser.ts';
import { type FetchStrategy, type MoviePage, popularStrategy, searchStrategy } from './fetchStrategies.ts';
import { render, showError, startLoading, stopLoading } from './MovieRenderer.ts';

const browser = new MovieBrowser();
let strategy: FetchStrategy = popularStrategy;
let controller: AbortController | undefined;

const createNewRequest = (): AbortSignal => {
  controller?.abort();
  controller = new AbortController();
  return controller.signal;
};

const applyResult = (data: MoviePage, onSuccess?: () => void) => {
  onSuccess?.();
  browser.setTotalPages(data.totalPages);
  render(browser, data.results);
  stopLoading();
};

const handleError = (error: unknown) => {
  if (error instanceof DOMException && error.name === 'AbortError') return;
  showError(error);
};

const load = async (page: number, onSuccess?: () => void) => {
  const signal = createNewRequest();
  startLoading();
  try {
    const data = await strategy(page, signal);
    applyResult(data, onSuccess);
  } catch (error) {
    stopLoading();
    handleError(error);
  }
};

export const loadPopular = () => load(browser.currentPage);

export const search = (keyword: string) => {
  strategy = searchStrategy(keyword);
  browser.startSearch(keyword);
  return load(browser.currentPage);
};

export const loadMore = () => {
  if (!browser.canLoadMore) return;
  return load(browser.nextPageNumber, () => browser.nextPage());
};
