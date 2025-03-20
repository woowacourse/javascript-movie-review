import { getPopularMovies } from "./apis/getPopularMovies";
import { getSearchedMovies } from "./apis/getSearchedMovies";
import backgroundContainer from "./components/backgroundContainer";
import movieContainer from "./components/movie/movieContainer";
import skeletonContainer from "./components/skeleton/skeletonContainer";
import skeletonContainerTitle from "./components/skeleton/skeletonTitleContainer";
import { $ } from "./components/utils/selectors";

const onSearch = async (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;

  event.preventDefault();
  const formData = new FormData(event.target);
  const searchKeyword = formData.get("search-bar");

  if (typeof searchKeyword === "string") {
    const $main = $("main");

    $(".movie-container")?.remove();

    const $skeleton = skeletonContainer(20);
    $skeleton.prepend(skeletonContainerTitle());

    $main?.append($skeleton);

    const { results, page, total_pages, total_results } =
      await getSearchedMovies(searchKeyword);

    $skeleton.remove();

    const loadMoreCallback = async (pageNumber: number) =>
      await getSearchedMovies(searchKeyword, pageNumber);

    const $searchedMovieContainer = movieContainer(
      `"${searchKeyword}" 검색 결과`,
      { results, page, total_pages, total_results },
      loadMoreCallback
    );

    $main?.append($searchedMovieContainer);
  }
};

const initializeMovie = async () => {
  const $main = $("main");

  const $skeleton = skeletonContainer(20);
  $skeleton.prepend(skeletonContainerTitle());
  $main?.append($skeleton);

  const { results, page, total_pages, total_results } =
    await getPopularMovies();

  $skeleton.remove();

  const loadMoreCallback = async (pageNumber: number) =>
    await getPopularMovies(pageNumber);

  const $movieContainer = movieContainer(
    "지금 인기 있는 영화",
    { results, page, total_pages, total_results },
    loadMoreCallback
  );

  $main?.append($movieContainer);
};

const $header = $("header");
$header?.append(backgroundContainer);

await initializeMovie();

const $searchBar = $("#search-bar-container");
$searchBar?.addEventListener("submit", onSearch);
