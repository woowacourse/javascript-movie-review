import { Movie } from "../types/domain.ts";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import { IMAGE } from "./constants/movie.ts";
import { fetchMovies, selectElement } from "./utils/ui.ts";
import MovieList from "./components/MovieList.ts";
import movieService from "./service/movieService.ts";
import Modal from "./components/Modal.ts";

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

const createObserverCallback = (
  fetch: (
    movieList: MovieList,
    observer: IntersectionObserver
  ) => Promise<void>,
  movieList: MovieList
): IntersectionObserverCallback => {
  return (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetch(movieList, observer);
        observer.unobserve(entry.target);
      }
    });
  };
};

const updateMovieList = async (
  movieList: MovieList,
  observer: IntersectionObserver
) => {
  const totalItems = movieList.getTotalItems();
  const newMovieData = await fetchMovies({
    currentItemCount: totalItems,
    apiFetcher: movieService.getMovies,
  });

  const movieItems = createMovieItems(newMovieData);
  movieList.updateList(movieItems);

  const newTarget = selectElement("ul.thumbnail-list > li:last-child");
  if (newTarget) {
    observer.observe(newTarget);
  }
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

    const getSearchResults = async (
      query: string,
      currentItemCount: number
    ) => {
      return await fetchMovies({
        currentItemCount,
        apiFetcher: (page, query) =>
          movieService.searchMovies(page, query ?? ""),
        query,
      });
    };

    searchBar.setEvent(getSearchResults);

    const movieData = await fetchMovies({ apiFetcher: movieService.getMovies });
    const movieList = createMovieList(movieData);

    const detailsModal = new Modal();

    renderTitleMovie(movieData);
    movieList.create();
    movieList.onMovieClick(getDetail, detailsModal);

    const lastMovieItemObserver = new IntersectionObserver(
      createObserverCallback(updateMovieList, movieList),
      { threshold: 1 }
    );

    const targetElement = selectElement<HTMLLIElement>(
      "ul.thumbnail-list > li:last-child"
    );

    lastMovieItemObserver.observe(targetElement);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

app();
