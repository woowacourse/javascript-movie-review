import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";
import MovieList from "./components/MovieList";

const queryState = new QueryState();

const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });
const movieList = new MovieList({
  targetId: "movie-list",
  queryState,
});

queryState.addObserver(movieList);

movieHeader.init();
movieList.init();
