import { addMoreMovies } from "../domain/addMoreMovies";
import { pageManager } from "../domain/pageManager";
import { showErrorPage } from "../ui/renderers/showErrorPage";

const options = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.1,
};

let isLoading = false;

const onIntersect = async (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  const entry = entries[0];

  if (entry.isIntersecting && !isLoading) {
    if (pageManager.isLastPage()) {
      observer.unobserve(entry.target);
      return;
    }

    const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;
    if (!$movieList) return;

    isLoading = true;

    const result = await addMoreMovies($movieList);

    if (!result.success) {
      showErrorPage();
      observer.unobserve(entry.target);
      isLoading = false;
      return;
    }

    observer.unobserve(entry.target);
    updateObserverTarget(observer);
    isLoading = false;
  }
};

const observer = new IntersectionObserver(onIntersect, options);

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

  updateObserverTarget(observer);
}
