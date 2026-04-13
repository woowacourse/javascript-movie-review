import MoviePage from './MoviePage.ts';
import { fetchMovieDetails, fetchPopularMovies, fetchSearchMovies } from '../api/fetchApi.ts';
import { MovieStore } from '../storage/types.ts';

const onSubmit = (query: string): void => {
  if (query.trim()) {
    location.hash = `/search?query=${encodeURIComponent(query)}`;
  }
};

export const createHomePage = (movieDB: MovieStore): MoviePage => {
  return new MoviePage({
    type: 'home',
    fetchMovie: (page: number) => fetchPopularMovies(page),
    fetchDetail: (movie_id: number) => fetchMovieDetails(movie_id),
    onSubmit,
    movieDB,
  });
};

export const createSearchPage = (query: string, movieDB: MovieStore): MoviePage => {
  return new MoviePage({
    type: 'search',
    fetchMovie: (page: number) => fetchSearchMovies(query, page),
    fetchDetail: (movie_id: number) => fetchMovieDetails(movie_id),
    onSubmit,
    query,
    movieDB,
  });
};
