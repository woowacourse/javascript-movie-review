import Footer from "./components/Footer";
import Header from "./components/Header";
import MoreMoviesButton from "./components/MoreMoviesButton";
import MovieList from "./components/MovieList";

export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

export const BASE_URL = "https://api.themoviedb.org/3/movie";
const MAX_PAGE = 2;

const App = async () => {
  let page = 1;

  const { movies, topRatedMovie } = await fetchMovies(page);

  renderHeader(topRatedMovie);
  renderMoviesContainer();
  renderMovies(movies);
  renderMoreMoviesButton();
  renderFooter();

  const moreButton = document.querySelector(".more-movies-button");

  moreButton?.addEventListener("click", async () => {
    page += 1;
    const { movies: newMovies } = await fetchMovies(page);
    renderMovies(newMovies);

    if (page >= MAX_PAGE) {
      removeMoreMoviesButton();
      return;
    }
  });
};

const fetchMovies = async (page: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  const raw = await fetch(
    `${BASE_URL}/popular?language=en-US&page=${page}`,
    options
  );
  const data = await raw.json();
  const movies: Movie[] = data.results;
  const topRatedMovie: Movie = movies[0];

  return { movies, topRatedMovie };
};

const renderHeader = (topRatedMovie: Movie) => {
  const root = document.querySelector("#wrap");
  root?.insertAdjacentHTML("afterbegin", Header(topRatedMovie));
};

const renderMoviesContainer = () => {
  const section = document.querySelector("main section");
  section?.insertAdjacentHTML(
    "afterbegin",
    "<h2>지금 인기 있는 영화</h2><ul class='thumbnail-list'></ul>"
  );
};

const renderMovies = (movies: Movie[]) => {
  const ul = document.querySelector(".thumbnail-list");
  ul?.insertAdjacentHTML("beforeend", MovieList(movies));
};

const renderFooter = () => {
  const root = document.querySelector("#wrap");
  root?.insertAdjacentHTML("beforeend", Footer());
};

const renderMoreMoviesButton = () => {
  const container = document.querySelector(".container");
  container?.insertAdjacentHTML("beforeend", MoreMoviesButton());
};

const removeMoreMoviesButton = () => {
  document.querySelector(".more-movies-button")?.remove();
};

App();
