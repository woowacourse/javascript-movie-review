import moveList from '../components/MovieList';
import { FetchStandard } from '../types/fetcherType';
import { Movie } from '../types/movie';

export default (movieData: Movie, fetchStandard: FetchStandard) => {
  const isLastPage = movieData.totalPages === fetchStandard.page;
  moveList.updateMovieList(movieData.movies, isLastPage);
};
