import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import MovieListTitle from "./components/movieList/MovieListTitle";
import MovieList from "./components/movieList/MovieList";
import MovieDetailModal from "./components/modal/MovieDetailModal";
import SkeletonUI from "./components/SkeletonUI";
import { generateMovieListSkeleton } from "./components/templates/generateMovieListSkeleton";

import QueryState from "./states/QueryState";
import MovieState from "./states/MovieState";

const queryState = new QueryState();
const movieState = new MovieState();

const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });
const movieListTitle = new MovieListTitle({
  targetId: "movie-list-header",
  queryState,
});

const movieListSkeleton = new SkeletonUI(generateMovieListSkeleton());
const movieList = new MovieList({
  targetId: "movie-list",
  skeletonUI: movieListSkeleton,
  queryState,
  movieState,
});

const movieDetailModal = new MovieDetailModal({
  targetId: "movie-detail-modal",
  movieState,
});

queryState.addObserver(movieList);
movieState.addObserver(movieDetailModal);

movieHeader.init();
movieListTitle.init();
movieList.init();
