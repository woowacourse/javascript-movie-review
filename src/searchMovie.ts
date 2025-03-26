import hideBackgroundContainer from "./components/backgroundContainer/hideBackgroundContainer";
import showErrorContainer from "./components/errorContainer/showErrorContainer";
import movieContainer from "./components/movie/movieContainer";
import hideSkeletonContainer from "./components/skeleton/hideSkeletonContainer";
import showSkeletonContainer from "./components/skeleton/showSkeletonContainer";
import { $ } from "./components/utils/selectors";
import { fetchSearchedMovies } from "./domain/apis/fetchSearchedMovies";

const handleSearchFormSubmit = (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(event.target);
  const searchKeyword = formData.get("search-bar");

  if (typeof searchKeyword !== "string" || searchKeyword.trim() === "") {
    return null;
  }

  return searchKeyword;
};

const initializeSearchUI = ($main: Element | null) => {
  hideBackgroundContainer();
  $(".container")?.classList.add("no-background-container");

  $main?.replaceChildren();
};

const createMovieDisplay = async (
  searchKeyword: string,
  $main: Element | null
) => {
  const { results, page, total_pages, total_results } =
    await fetchSearchedMovies(searchKeyword);

  const loadMoreCallback = async (pageNumber: number) =>
    await fetchSearchedMovies(searchKeyword, pageNumber);

  const $searchedMovieContainer = movieContainer({
    movieListTitle: `"${searchKeyword}" 검색 결과`,
    movieData: { results, page, total_pages, total_results },
    loadMoreCallback,
  });

  $main?.append($searchedMovieContainer);
};

const searchMovie = async (event: Event) => {
  try {
    const searchKeyword = handleSearchFormSubmit(event);
    if (!searchKeyword) {
      return;
    }

    const $main = $("main");

    initializeSearchUI($main);

    showSkeletonContainer($main, true);

    await createMovieDisplay(searchKeyword, $main);

    hideSkeletonContainer();
  } catch (error: unknown) {
    showErrorContainer(error);
  }
};

export default searchMovie;
