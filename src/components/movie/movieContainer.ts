import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import movieList from "./movieList";
import { MovieData } from "../../apis/getSearchedMovies";

type LoadMoreCallback = (pageNumber: number) => Promise<MovieData>;

const MAX_PAGES = 500;

const movieContainer = (
  movieListTitle: string,
  movieData: MovieData,
  loadMoreCallback: LoadMoreCallback
) => {
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

  const { results, total_pages, total_results } = movieData;

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

  let pageNumber = 1;
  $seeMoreButton.addEventListener("click", async () => {
    pageNumber += 1;

    const { results, total_pages } = await loadMoreCallback(pageNumber);
    const $newMovieList = movieList(results);
    $movieList.append(...$newMovieList.children);
    if (pageNumber === total_pages || pageNumber === MAX_PAGES) {
      $seeMoreButton.remove();
    }
  });

  $movieContainer.append($movieList);
  if (pageNumber !== total_pages) {
    $movieContainer.append($seeMoreButton);
  }

  return $movieContainer;
};

export default movieContainer;
