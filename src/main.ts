import { Movie } from "../types/domain.ts";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import { ITEMS } from "./constants/movie.ts";
import { selectElement } from "./utils/ui.ts";
import movieService from "./service/movieService.ts";
import Modal from "./components/Modal.ts";
import ScrollRenderer from "./utils/scrollRenderer.ts";
import MovieList from "./components/MovieList.ts";
import MovieItem from "./components/MovieItem.ts";
import ErrorUI from "./components/ErrorUI.ts";
import { ERROR, STATUS_MESSAGE } from "./constants/error.ts";
import Banner from "./components/Banner.ts";

const getMovieData = async (totalItems: number) => {
  try {
    return await SkeletonUl.getInstance().getLoadingResult(() =>
      movieService.getMovies(totalItems)
    );
  } catch (error) {
    if (error instanceof Error) {
      const status = Number(error.message);
      const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
      const errorUI = new ErrorUI({ status, message });
      errorUI.create();
      errorUI.renderError();
    }
  }
};

const renderTitleMovie = (movieData: Movie[]) => {
  const topMovieData = movieData[0];
  const banner = new Banner(topMovieData);
  banner.renderTitleMovie();
};

const createMovieItems = (movieData: Movie[]): string[] => {
  return movieData.map(({ id, title, posterPath, voteAverage }) => {
    const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
    return movieItem.create();
  });
};

const createMovieList = (movieData: Movie[]) => {
  const movieItems = createMovieItems(movieData);
  return new MovieList(movieItems);
};

const updateMovieList = async (
  movieList: MovieList,
  observer: IntersectionObserver,
  scrollRenderer: ScrollRenderer
) => {
  const totalItems = movieList.getTotalItems();
  const movieData = await getMovieData(totalItems);
  if (movieData) {
    const { page, results, totalPages } = movieData;

    if (page >= totalPages) {
      observer.disconnect();
      return;
    }

    const movieItems = createMovieItems(results);
    movieList.updateList(movieItems);

    scrollRenderer.setNewObservingTarget(
      observer,
      "ul.thumbnail-list > li:last-child"
    );
  }
};

const searchBar = new SearchBar();
const logo = selectElement<HTMLDivElement>(".logo");
const logoImage = selectElement<HTMLImageElement>(".logo img");

const app = async () => {
  logoImage.addEventListener("click", () => {
    window.location.reload();
  });

  logo.appendChild(searchBar.create());
  searchBar.setEvent();

  const movieData = await getMovieData(ITEMS.initialCount);
  if (movieData) {
    const { results } = movieData;
    const movieList = createMovieList(results);
    renderTitleMovie(results);
    movieList.create();

    const detailsModal = new Modal();
    movieList.onMovieClick(detailsModal);

    const scrollRenderer = ScrollRenderer.getInstance();
    const lastMovieItemObserver = new IntersectionObserver(
      scrollRenderer.createObserverCallback(updateMovieList, movieList),
      { threshold: 1 }
    );

    const targetElement = selectElement<HTMLLIElement>(
      "ul.thumbnail-list > li:last-child"
    );

    lastMovieItemObserver.observe(targetElement);
  }
};

app();
