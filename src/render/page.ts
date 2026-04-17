import { showErrorToast } from "../toast";
import { Movie, MovieListResponse } from "../type";
import { setPage } from "../url";
import { removeSkeletonItem, renderMovies, renderSkeletonItems } from "./list";
import { throttle } from "./utils/throttle";

let scrollObserver: IntersectionObserver | null = null;

function getHasMorePages(prevResponseList: MovieListResponse[], page: number): boolean {
  return prevResponseList.length > 0 && prevResponseList[prevResponseList.length - 1].total_pages > page;
}

function getOrCreateScrollSentinel(): HTMLElement | null {
  let sentinel = document.querySelector<HTMLElement>(".scroll-sentinel");

  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.className = "scroll-sentinel";
    document.querySelector(".thumbnail-list")?.insertAdjacentElement("afterend", sentinel);
  }

  return sentinel;
}

function setupInfiniteScroll(prevResponseList: MovieListResponse[], page: number, callback: () => void) {
  scrollObserver?.disconnect();
  scrollObserver = null;

  const sentinel = document.querySelector<HTMLElement>(".scroll-sentinel");
  if (!getHasMorePages(prevResponseList, page)) {
    sentinel?.remove();
    return;
  }

  const activeSentinel = sentinel ?? getOrCreateScrollSentinel();
  if (!activeSentinel) return;

  const throttledCallback = throttle(callback);
  scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      throttledCallback();
    }
  });
  scrollObserver.observe(activeSentinel);
}

function flattenMovieResponses(responseList: MovieListResponse[]): Movie[] {
  return responseList.flatMap((response) => response.results);
}

export async function renderMoviePage({
  page,
  prevResponseList,
  fetchFn,
  beforeFetch,
  afterRender,
  extraFinally,
  showMoreCallback,
}: {
  page: number;
  prevResponseList: MovieListResponse[];
  fetchFn: (startPage: number, page: number) => Promise<MovieListResponse[]>;
  beforeFetch?: () => void;
  afterRender?: () => void;
  extraFinally?: () => void;
  showMoreCallback: () => void;
}): Promise<void> {
  try {
    setPage(page);
    beforeFetch?.();
    renderSkeletonItems();

    const responseList = await fetchFn(prevResponseList.length, page);
    prevResponseList.push(...responseList);

    renderMovies(flattenMovieResponses(responseList));
    afterRender?.();

    setupInfiniteScroll(prevResponseList, page, showMoreCallback);
  } catch (error) {
    const title = error instanceof Error ? error.name : "Error";
    const message = error instanceof Error ? error.message : String(error);
    showErrorToast({ title, message });
  } finally {
    removeSkeletonItem();
    extraFinally?.();
  }
}
