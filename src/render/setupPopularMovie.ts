import { FetchStandard } from '../types/fetchType';
import movieList from '../components/MovieList';

export default (fetchStandard: FetchStandard) => {
  movieList.setListName(fetchStandard.type);
  movieList.cleanMovieList();
  movieList.createSkeleton();
};
