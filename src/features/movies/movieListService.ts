import { getMovieByName, getMovies, MoviesResponse } from "../../apis/MovieApi";
import { movieStore } from "../../state/movieStore";

const updateMovieStore = (response: MoviesResponse) => {
  const summary = response.results.map((movie) => ({
    backdrop_path: movie.backdrop_path,
    title: movie.title,
    vote_average: movie.vote_average,
  }));
  movieStore.movies = [...movieStore.movies, ...summary];
  movieStore.totalPages = response.total_pages;
};

export const loadTotalList = async () => {
  const moviesResponse = await getMovies({ page: movieStore.page });
  updateMovieStore(moviesResponse);
};

export const loadSearchList = async () => {
  const moviesResponse = await getMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  });
  updateMovieStore(moviesResponse);
};
