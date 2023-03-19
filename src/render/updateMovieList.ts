import movieList from '../components/MovieList';
import { Movie } from '../@types/movieType';
import { FetchStandard } from '../@types/fetchType';

export default (movieData: Movie, fetchStandard: FetchStandard) => {
  const isLastPage = movieData.totalPages === fetchStandard.page;
  movieList.updateMovieList(movieData.movies, isLastPage);
};
