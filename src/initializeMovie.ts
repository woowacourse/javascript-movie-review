import movieContainer from "./components/movie/movieContainer";
import hideSkeletonContainer from "./components/skeleton/hideSkeletonContainer";
import showSkeletonContainer from "./components/skeleton/showSkeletonContainer";
import { $ } from "./components/utils/selectors";
import { fetchPopularMovies } from "./domain/apis/fetchPopularMovies";

const createMovieDisplay = async ($main: Element | null) => {
  const { results, page, total_pages, total_results } =
    await fetchPopularMovies();

  const loadMoreCallback = async (pageNumber: number) =>
    await fetchPopularMovies(pageNumber);

  const $movieContainer = movieContainer({
    movieListTitle: "지금 인기 있는 영화",
    movieData: { results, page, total_pages, total_results },
    loadMoreCallback,
  });

  $main?.append($movieContainer);
};

const initializeMovie = async () => {
  const $main = $("main");

  showSkeletonContainer($main, true);

  createMovieDisplay($main);

  hideSkeletonContainer();
};

export default initializeMovie;
