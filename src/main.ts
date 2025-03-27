import { Movie } from "../types/domain.ts";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import { IMAGE, ITEMS } from "./constants/movie.ts";
import { selectElement } from "./utils/dom.ts";
import { toggleElementVisibility } from "./utils/Render.ts";
import MovieList from "./components/MovieList.ts";
import calculatePageNumber from "./domain/calculatePageNumber.ts";
import movieService from "./service/movieService.ts";

const getTotalMovies = async (
  currentItemCount: number = ITEMS.initialCount
) => {
  toggleElementVisibility(".skeleton-list", "show");

  const pageNumber = calculatePageNumber(currentItemCount);
  const { results, totalResults } = await movieService.getMovies(pageNumber);

  if (totalResults === 0) {
    toggleElementVisibility(".no-thumbnail", "show");
  }

  toggleElementVisibility(".skeleton-list", "hidden");

  return results;
};

const getSearchResults = async (query: string, currentItemCount: number) => {
  const pageNumber = calculatePageNumber(currentItemCount);

  toggleElementVisibility(".skeleton-list", "show");

  const { results, totalResults } = await movieService.searchMovies(
    pageNumber,
    query
  );

  if (totalResults === 0) {
    toggleElementVisibility(".no-thumbnail", "show");
  }

  toggleElementVisibility(".skeleton-list", "hidden");

  return results;
};

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

const renderMovieData = (movieData: Movie[]) => {
  const movieItems = movieData.map(({ title, posterPath, voteAverage }) => {
    const movieItem = new MovieItem({ title, voteAverage, posterPath });
    return movieItem.create();
  });

  return new MovieList(movieItems);
};

const mainSection = selectElement<HTMLElement>("main section");
const skeletonUl = new SkeletonUl();
const searchBar = new SearchBar();
const logo = selectElement<HTMLDivElement>(".logo");
const logoImage = selectElement<HTMLImageElement>(".logo img");

const app = async () => {
  try {
    logoImage.addEventListener("click", () => {
      window.location.reload();
    });

    logo.appendChild(searchBar.create());
    mainSection.appendChild(skeletonUl.create());
    searchBar.setEvent(getSearchResults);

    const movieData = await getTotalMovies();

    renderTitleMovie(movieData);
    const totalMovieList = renderMovieData(movieData);
    totalMovieList.create();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

app();
