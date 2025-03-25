import { fetchPopularMovies } from "./domain/apis/fetchPopularMovies";
import { fetchSearchedMovies } from "./domain/apis/fetchSearchedMovies";
import backgroundContainer from "./components/backgroundContainer";
import movieContainer from "./components/movie/movieContainer";
import { createElementWithAttributes } from "./components/utils/createElementWithAttributes";
import { $ } from "./components/utils/selectors";
import showSkeletonContainer from "./components/skeleton/utils/showSkeletonContainer";
import hideSkeletonContainer from "./components/skeleton/utils/hideSkeletonContainer";

const onSearch = async (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;

  event.preventDefault();
  try {
    const formData = new FormData(event.target);
    const searchKeyword = formData.get("search-bar");

    if (typeof searchKeyword === "string") {
      const $main = $("main");

      $(".movie-container")?.remove();

      $(".background-container")?.remove();
      $(".container")?.classList.add("no-background-container");

      showSkeletonContainer($main, true);

      const { results, page, total_pages, total_results } =
        await fetchSearchedMovies(searchKeyword);

      hideSkeletonContainer();

      const loadMoreCallback = async (pageNumber: number) =>
        await fetchSearchedMovies(searchKeyword, pageNumber);

      const $searchedMovieContainer = movieContainer({
        movieListTitle: `"${searchKeyword}" 검색 결과`,
        movieData: { results, page, total_pages, total_results },
        loadMoreCallback,
      });

      $main?.append($searchedMovieContainer);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const $main = $("main");
      $main?.replaceChildren();

      const $backgroundContainer = $(".background-container");
      $backgroundContainer?.remove();

      const $errorContainer = createElementWithAttributes({
        tag: "div",
        className: "error-container",
        children: [
          { tag: "h1", textContent: `${error.message} 새로고침 해주세요!` },
        ],
      });

      $main?.append($errorContainer);
    }
  }
};

const initializeMovie = async () => {
  const $main = $("main");

  showSkeletonContainer($main, true);

  const { results, page, total_pages, total_results } =
    await fetchPopularMovies();

  hideSkeletonContainer();

  const loadMoreCallback = async (pageNumber: number) =>
    await fetchPopularMovies(pageNumber);

  const $movieContainer = movieContainer({
    movieListTitle: "지금 인기 있는 영화",
    movieData: { results, page, total_pages, total_results },
    loadMoreCallback,
  });

  $main?.append($movieContainer);
};

const $header = $("header");
$header?.append(backgroundContainer);

const main = async () => {
  try {
    await initializeMovie();

    const $searchBar = $("#search-bar-container");
    $searchBar?.addEventListener("submit", onSearch);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const $main = $("main");
      $main?.replaceChildren();

      const $backgroundContainer = $(".background-container");
      $backgroundContainer?.remove();

      const $errorContainer = createElementWithAttributes({
        tag: "div",
        className: "error-container",
        children: [
          { tag: "h1", textContent: `${error.message} 새로고침 해주세요!` },
        ],
      });

      $main?.append($errorContainer);
    }
  }
};
main();
