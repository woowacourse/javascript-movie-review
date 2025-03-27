import { getMovieByName, getMovies, MoviesResponse } from "../../apis/MovieApi";
import { movieStore } from "../../store/movieStore";

const updateMovieStore = (response: MoviesResponse) => {
  const summary = response.results.map((movie) => ({
    backdrop_path: movie.backdrop_path,
    title: movie.title,
    vote_average: movie.vote_average,
  }));
  movieStore.movies = [...movieStore.movies, ...summary];
  movieStore.totalPages = response.total_pages;
};

export const fetchTotalList = async () => {
  const moviesResponse = await getMovies({ page: movieStore.page });
  updateMovieStore(moviesResponse);
};

export const fetchSearchList = async () => {
  const moviesResponse = await getMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  });
  updateMovieStore(moviesResponse);
};
