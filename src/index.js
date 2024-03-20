import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";
import MovieList from "./components/MovieList";
import MoviesState from "./states/MoviesState";

const queryState = new QueryState();
const moviesState = new MoviesState();

const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });
const movieList = new MovieList({
  targetId: "movie-list",
  queryState,
  moviesState,
});
movieList.fetchInitialMovies();

queryState.addObserver(movieList);
moviesState.addObserver(movieList);

movieHeader.init();
movieList.init();
