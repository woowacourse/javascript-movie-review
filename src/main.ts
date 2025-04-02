import { Movie } from "../types/domain.ts";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import { IMAGE, ITEMS } from "./constants/movie.ts";
import { selectElement } from "./utils/ui.ts";
import movieService from "./service/movieService.ts";
import Modal from "./components/Modal.ts";
import ScrollRenderer from "./utils/scrollRenderer.ts";
import MovieList from "./components/MovieList.ts";
import MovieItem from "./components/MovieItem.ts";

const getDetail = async (id: number) => {
  return await movieService.getMovieDetail(id);
};

const renderTitleMovie = (movieData: Movie[]) => {
  const topMovieData = movieData[0];
  const movieTitle = topMovieData.title;
  const movieRate = topMovieData.voteAverage;
  const movieBackdropUrl = IMAGE.backdropPrefix + topMovieData.backdropPath;

  const topMovieTitle = selectElement<HTMLDivElement>(
    ".top-rated-movie .title"
  );
  const topMovieRateValue = selectElement<HTMLSpanElement>(
    ".top-rated-movie .rate-value"
  );
  const backgroundOverlay = selectElement<HTMLDivElement>(
    ".background-container .overlay"
  );

  topMovieTitle.textContent = movieTitle;
  topMovieRateValue.textContent = String(movieRate);
  backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
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
  const { results } = await SkeletonUl.getInstance().getLoadingResult(() =>
    movieService.getMovies(totalItems)
  );

  const movieItems = createMovieItems(results);
  movieList.updateList(movieItems);

  scrollRenderer.setNewObservingTarget(
    observer,
    "ul.thumbnail-list > li:last-child"
  );
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

  const { results } = await SkeletonUl.getInstance().getLoadingResult(() =>
    movieService.getMovies(ITEMS.initialCount)
  );

  const movieList = createMovieList(results);
  renderTitleMovie(results);
  movieList.create();

  const detailsModal = new Modal();
  movieList.onMovieClick(getDetail, detailsModal);

  const scrollRenderer = ScrollRenderer.getInstance();
  const lastMovieItemObserver = new IntersectionObserver(
    scrollRenderer.createObserverCallback(updateMovieList, movieList),
    { threshold: 1 }
  );

  const targetElement = selectElement<HTMLLIElement>(
    "ul.thumbnail-list > li:last-child"
  );

  lastMovieItemObserver.observe(targetElement);
};

app();
