import { MovieFetchInfo } from '../types/fetchType';
import { Movie } from '../types/movieType';
import movieList from '../components/MovieList';

export default (movieData: Movie, movieFetchInfo: MovieFetchInfo) => {
  const isLastPage = movieData.totalPages === movieFetchInfo.page;
  movieList.updateMovieList(movieData.movies, isLastPage);
};
