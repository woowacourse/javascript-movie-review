import { getPopularMovies } from "./apis/getPopularMovies";
import { getSearchedMovies } from "./apis/getSearchedMovies";
import movieContainer from "./components/movie/movieContainer";
import { $ } from "./components/utils/selectors";
import { Movie } from "./components/movie/types";

const onSearch = async (event: Event) => {
  if (event.target instanceof HTMLFormElement === false) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(event.target);
  const searchKeyword = formData.get("search-bar");

  if (typeof searchKeyword === "string") {
    const results: Movie[] = await getSearchedMovies(searchKeyword);

    const loadMoreCallback = async (pageNumber: number) =>
      await getSearchedMovies(searchKeyword, pageNumber);

    const $movieContainer = $(".movie-container");
    $movieContainer?.remove();

    const $searchedMovieContainer = movieContainer(
      `${searchKeyword} 검색 결과`,
      results,
      loadMoreCallback
    );

    const $main = $("main");
    $main?.append($searchedMovieContainer);
  }
};

const initializeMovie = async () => {
  const results: Movie[] = await getPopularMovies();

  const loadMoreCallback = async (pageNumber: number) =>
    await getPopularMovies(pageNumber);

  const $movieContainer = movieContainer(
    "지금 인기 있는 영화",
    results,
    loadMoreCallback
  );

  const $main = $("main");
  $main?.append($movieContainer);
};

await initializeMovie();

const $searchBar = $("#search-bar-container");
$searchBar?.addEventListener("submit", onSearch);
