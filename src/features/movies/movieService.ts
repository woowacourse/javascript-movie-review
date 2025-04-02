import { MovieDetailInfo } from "../../../types/movieApiType";
import { MovieDetail, MoviesResponse } from "../../apis/apiTypes";
import {
  fetchMovieByName,
  fetchMovieDetail,
  fetchMovies,
} from "../../apis/MovieApi";
import { movieStore } from "../../state/movieStore";

//update
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

//read
export const readMovieDetail = async (): Promise<MovieDetailInfo> => {
  const movieResponse = (await fetchMovieDetail({
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

//update
export const updateTotalList = async () => {
  const moviesResponse = (await fetchMovies({
    page: movieStore.page,
  })) as MoviesResponse;
  updateMovieList(moviesResponse);
};

//update
export const updateSearchList = async () => {
  const moviesResponse = (await fetchMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  })) as MoviesResponse;
  updateMovieList(moviesResponse);
};
