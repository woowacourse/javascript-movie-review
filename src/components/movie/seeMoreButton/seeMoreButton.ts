import hideSkeletonContainer from "../../skeleton/utils/hideSkeletonContainer";
import showSkeletonContainer from "../../skeleton/utils/showSkeletonContainer";
import { createElementWithAttributes } from "../../utils/createElementWithAttributes";
import { LoadMoreCallback } from "../movieContainer";
import movieList from "../movieList/movieList";

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
  const MAX_PAGES = 500;
  let pageNumber = 1;
  const seeMoreMovies = async () => {
    pageNumber += 1;

    showSkeletonContainer($movieList);

    const { results, total_pages } = await loadMoreCallback(pageNumber);

    if (pageNumber === total_pages || pageNumber === MAX_PAGES) {
      $seeMoreButton.removeEventListener("click", seeMoreMovies);
      $seeMoreButton.remove();
    }

    hideSkeletonContainer();

    const $newMovieList = movieList(results);
    $movieList.append(...$newMovieList.children);
  };

  return { seeMoreMovies };
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

  const { seeMoreMovies } = setupSeeMoreMoviesHandler({
    $movieList,
    loadMoreCallback,
    $seeMoreButton,
  });
  $seeMoreButton.addEventListener("click", seeMoreMovies);

  return $seeMoreButton;
};

export default seeMoreButton;
