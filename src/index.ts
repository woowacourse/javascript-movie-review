import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";
import MovieListTitle from "./components/MovieList/MovieListTitle";
import MovieList from "./components/MovieList/MovieList";
import SkeletonUI from "./components/SkeletonUI";
import MovieDetail from "./components/MovieDetail";

const queryState = new QueryState();

const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });
const movieListTitle = new MovieListTitle({
  targetId: "movie-list-header",
  queryState,
});

const movieListSkeleton = new SkeletonUI("movie");
const movieList = new MovieList({
  targetId: "movie-list",
  queryState,
  skeletonUI: movieListSkeleton,
});
const movieDetailModal = new MovieDetail({
  targetId: "movie-detail-modal",
});

queryState.addObserver(movieListTitle);
queryState.addObserver(movieList);

movieHeader.initialize();
movieListTitle.initialize();
movieList.initialize();
movieDetailModal.initialize();
