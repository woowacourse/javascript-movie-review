import { addMoreMovies } from "../domain/addMoreMovies";
import { pageManager } from "../domain/pageManager";
import { showErrorPage } from "../ui/renderers/showErrorPage";

interface InfiniteScrollOptions {
  onIntersect: () => Promise<boolean>;
  onError?: (message: string) => void;
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
        onError?.("영화를 불러오는데 실패했습니다.");
        observer.unobserve(entry.target);
        isLoading = false;
        return;
      }

      isLoading = false;
    }
  };

  return new IntersectionObserver(onIntersectHandler, options);
};

export function initInfiniteScroll() {
  const $target = document.querySelector(".observer-target");
  if (!$target) return;

  if (pageManager.isLastPage()) return;

  const observer = createIntersectionObserver({
    onIntersect: handleIntersect,
    onError: showErrorPage,
  });

  observer.observe($target);
}

async function handleIntersect() {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;
  if (!$movieList) return false;

  const result = await addMoreMovies($movieList);
  return result.success;
}
