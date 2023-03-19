import moveList from '../components/MoiveList';
import { Movie } from '../@types/movieType';
import { FetchStandard } from '../@types/fetchType';

export default (movieData: Movie, fetchStandard: FetchStandard) => {
  const isLastPage = movieData.totalPages === fetchStandard.page;
  moveList.updateMovieList(movieData.movies, isLastPage);
};
