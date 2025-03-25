import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import movieList from "./movieList/movieList";
import { MovieData } from "../../domain/types";
import showSkeletonContainer from "../skeleton/utils/showSkeletonContainer";
import hideSkeletonContainer from "../skeleton/utils/hideSkeletonContainer";

type LoadMoreCallback = (pageNumber: number) => Promise<MovieData>;

interface MovieContainerProps {
  movieListTitle: string;
  movieData: MovieData;
  loadMoreCallback: LoadMoreCallback;
}

const setupSeeMoreMoviesHandler = ({
  $movieList,
  $seeMoreButton,
  loadMoreCallback,
}: {
  $movieList: HTMLElement;
  $seeMoreButton: HTMLElement;
  loadMoreCallback: LoadMoreCallback;
}) => {
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

const movieContainer = ({
  movieListTitle,
  movieData: { results, page, total_pages, total_results },
  loadMoreCallback,
}: MovieContainerProps) => {
  const $movieContainer = createElementWithAttributes({
    tag: "section",
    className: "movie-container",
    children: [
      {
        tag: "h2",
        textContent: movieListTitle,
      },
    ],
  });

  if (total_results === 0) {
    const $noSearchContainer = createElementWithAttributes({
      tag: "div",
      className: "no_search_container",
      children: [
        {
          tag: "img",
          className: "no_search_result_img",
          attributes: {
            src: "./images/no_search_result.png",
            alt: "검색 결과가 없습니다.",
          },
        },
        {
          tag: "h3",
          textContent: "검색 결과가 없습니다.",
          className: "no_search_result_text",
        },
      ],
    });
    $movieContainer.append($noSearchContainer);

    return $movieContainer;
  }

  const $movieList = movieList(results);

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

  $movieContainer.append($movieList);
  if (page !== total_pages) {
    $movieContainer.append($seeMoreButton);
  }

  return $movieContainer;
};

export default movieContainer;
