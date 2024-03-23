import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";
import MovieListTitle from "./components/MovieList/MovieListTitle";
import MovieList from "./components/MovieList/MovieList";
import SkeletonUI from "./components/SkeletonUI";
import { generateMovieListSkeleton } from "./components/templates/generateMovieListSkeleton";

const queryState = new QueryState();

const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });
const movieListTitle = new MovieListTitle({
  targetId: "movie-list-header",
  queryState,
});

const movieListSkeleton = new SkeletonUI(generateMovieListSkeleton());
const movieListBody = new MovieList({
  targetId: "movie-list",
  queryState,
  skeletonUI: movieListSkeleton,
});

queryState.addObserver(movieListTitle);
queryState.addObserver(movieListBody);

movieHeader.mount();
movieListTitle.mount();
movieListBody.mount();
