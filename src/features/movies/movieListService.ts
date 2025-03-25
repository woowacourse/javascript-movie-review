import { getMovieByName, getMovies } from "../../apis/MovieApi";
import { movieStore } from "../../store/movieStore";

export const fetchTotalList = async () => {
  const moviesResponse = await getMovies({ page: movieStore.page });
  movieStore.movies = [...movieStore.movies, ...moviesResponse.results];
  movieStore.totalPages = moviesResponse.total_pages;
};

export const fetchSearchList = async () => {
  const moviesResponse = await getMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  });
  movieStore.movies = [...movieStore.movies, ...moviesResponse.results];
  movieStore.totalPages = moviesResponse.total_pages;
};
