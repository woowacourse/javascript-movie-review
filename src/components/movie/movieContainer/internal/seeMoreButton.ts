import hideSkeletonContainer from "../../../skeleton/hideSkeletonContainer";
import showSkeletonContainer from "../../../skeleton/showSkeletonContainer";
import { createElementWithAttributes } from "../../../utils/createElementWithAttributes";
import { LoadMoreCallback } from "../movieContainer";
import movieList from "./movieList";
import createObserver from "../../../../domain/observer/observer";

interface SetupSeeMoreMoviesHandlerProps {
  $movieList: HTMLElement;
  $seeMoreButton: HTMLElement;
  loadMoreCallback: LoadMoreCallback;
}

const setupSeeMoreMoviesHandler = ({
  $movieList,
  $seeMoreButton,
  loadMoreCallback,
}: SetupSeeMoreMoviesHandlerProps) => {
  const observer = createObserver({
    options: {
      root: document.querySelector(".movie-container"),
      rootMargin: "0px",
      threshold: 0.25,
    },
    callback: async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        await seeMoreMovies();
      }
    },
  });

  observer.observeTarget($seeMoreButton);

  const MAX_PAGES = 500;
  let pageNumber = 1;
  const seeMoreMovies = async () => {
    pageNumber += 1;

    showSkeletonContainer($movieList);

    const { results, total_pages } = await loadMoreCallback(pageNumber);

    if (pageNumber === total_pages || pageNumber === MAX_PAGES) {
      observer.unObserveTarget($seeMoreButton);
      observer.disconnect();

      $seeMoreButton.removeEventListener("click", seeMoreMovies);
      $seeMoreButton.remove();
    }

    hideSkeletonContainer();

    const $newMovieList = movieList(results);
    $movieList.append(...$newMovieList.children);
  };
};

const seeMoreButton = (
  $movieList: HTMLElement,
  loadMoreCallback: LoadMoreCallback
) => {
  const $seeMoreButton = createElementWithAttributes({
    tag: "button",
    textContent: "더보기",
    className: "see-more",
  });

  setupSeeMoreMoviesHandler({
    $movieList,
    loadMoreCallback,
    $seeMoreButton,
  });

  return $seeMoreButton;
};

export default seeMoreButton;
