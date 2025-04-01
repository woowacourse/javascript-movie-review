import { addMoreMovies } from "../domain/addMoreMovies";
import { pageManager } from "../domain/pageManager";
import { showErrorPage } from "../ui/renderers/showErrorPage";

interface InfiniteScrollOptions {
  onIntersect: () => Promise<boolean>;
  onError?: () => void;
}

const options = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.1,
};

let isLoading = false;

const createIntersectionObserver = ({
  onIntersect,
  onError,
}: InfiniteScrollOptions) => {
  const onIntersectHandler = async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const entry = entries[0];

    if (entry.isIntersecting && !isLoading) {
      if (pageManager.isLastPage()) {
        observer.unobserve(entry.target);
        return;
      }

      isLoading = true;

      const success = await onIntersect();

      if (!success) {
        onError?.();
        observer.unobserve(entry.target);
        isLoading = false;
        return;
      }

      observer.unobserve(entry.target);
      updateObserverTarget(observer);
      isLoading = false;
    }
  };

  return new IntersectionObserver(onIntersectHandler, options);
};

function updateObserverTarget(observer: IntersectionObserver) {
  observer.disconnect();

  const thumbnails = document.querySelectorAll(".thumbnail");
  if (thumbnails.length === 0) return;

  const lastThumbnail = thumbnails[thumbnails.length - 1];
  observer.observe(lastThumbnail);
}

export function initInfiniteScroll() {
  const $movieContainer = document.getElementById("movie-container");
  if (!$movieContainer) return;

  if (pageManager.isLastPage()) return;

  const observer = createIntersectionObserver({
    onIntersect: handleIntersect,
    onError: showErrorPage,
  });

  updateObserverTarget(observer);
}

async function handleIntersect() {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;
  if (!$movieList) return false;

  const result = await addMoreMovies($movieList);
  return result.success;
}
