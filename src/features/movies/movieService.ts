import { MovieDetailInfo } from "../../../types/movieApiType";
import { MovieDetail, MoviesResponse } from "../../apis/apiTypes";
import { getMovieByName, getMovieDetail, getMovies } from "../../apis/MovieApi";
import { movieStore } from "../../state/movieStore";

const updateMovieList = (response: MoviesResponse) => {
  const summary = response.results.map((movie) => ({
    backdrop_path: movie.backdrop_path,
    title: movie.title,
    vote_average: movie.vote_average,
    id: movie.id,
  }));
  movieStore.movies = [...movieStore.movies, ...summary];
  movieStore.totalPages = response.total_pages;
};

export const fetchMovieDetail = async (): Promise<MovieDetailInfo> => {
  const movieResponse = (await getMovieDetail({
    id: movieStore.selectedMovie,
  })) as MovieDetail;
  return {
    backdrop_path: movieResponse.backdrop_path,
    genres: movieResponse.genres,
    id: movieResponse.id,
    overview: movieResponse.overview,
    release_date: movieResponse.release_date,
    title: movieResponse.title,
    vote_average: movieResponse.vote_average,
  };
};

export const loadTotalList = async () => {
  const moviesResponse = (await getMovies({
    page: movieStore.page,
  })) as MoviesResponse;
  updateMovieList(moviesResponse);
};

export const loadSearchList = async () => {
  const moviesResponse = (await getMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  })) as MoviesResponse;
  updateMovieList(moviesResponse);
};

export const loadMovieDetail = async () => {
  const movieDetail = (await getMovieDetail({
    id: movieStore.selectedMovie,
  })) as MovieDetail;
  console.log("mvDetail : ", movieDetail);
};
