import { $ } from "./components/utils/selectors";
import showBackgroundContainer from "./components/backgroundContainer/showBackgroundContainer";
import showErrorContainer from "./components/errorContainer/showErrorContainer";
import initializeMovie from "./initializeMovie";
import searchMovie from "./searchMovie";
import initializeCloseMovieDetailModal from "./components/movie/movieDetailModal/initializeCloseMovieDetailModal";

const main = async () => {
  try {
    const $header = $("header");

    showBackgroundContainer($header);

    await initializeMovie();

    const $searchBar = $("#search-bar-container");
    $searchBar?.addEventListener("submit", searchMovie);

    initializeCloseMovieDetailModal();
  } catch (error: unknown) {
    showErrorContainer(error);
  }
};

main();
