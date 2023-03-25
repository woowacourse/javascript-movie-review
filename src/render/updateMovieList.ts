import { FetchStandard } from '../types/fetchType';
import { Movie } from '../types/movieType';
import movieList from '../components/MovieList';

export default (movieData: Movie, fetchStandard: FetchStandard) => {
  const isLastPage = movieData.totalPages === fetchStandard.page;
  movieList.updateMovieList(movieData.movies, isLastPage);
};
