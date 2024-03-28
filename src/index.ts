import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";
import MovieListTitle from "./components/MovieList/MovieListTitle";
import MovieList from "./components/MovieList/MovieList";
import SkeletonUI from "./components/SkeletonUI";
import MovieDetailModal from "./components/MovieDetailModal";
import MovieDetailModalState from "./states/MovieDetailModalState";

const queryState = new QueryState();
const movieDetailModalState = new MovieDetailModalState();

const movieHeader = new MovieHeader({
  targetId: "movie-header-target",
  queryState,
});
const movieListTitle = new MovieListTitle({
  targetId: "movie-list-title-target",
  queryState,
});

const movieListSkeleton = new SkeletonUI("movie");
const movieList = new MovieList({
  targetId: "movie-list-target",
  queryState,
  movieDetailModalState,
  skeletonUI: movieListSkeleton,
});
const movieDetailModal = new MovieDetailModal({
  targetId: "movie-detail-modal-target",
  movieDetailModalState,
});

queryState.addObserver(movieListTitle);
queryState.addObserver(movieList);

movieDetailModalState.addObserver(movieDetailModal);

movieHeader.initialize();
movieListTitle.initialize();
movieList.initialize();
movieDetailModal.initialize();
