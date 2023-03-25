import { FetchStandard, FetchType } from '../types/fetchType';
import movieList from '../components/MovieList';

export default (fetchStandard: FetchStandard) => {
  if (fetchStandard.type === FetchType.Popular) return;

  movieList.setListName(fetchStandard.type, fetchStandard.keyword);
  movieList.cleanMovieList();
  movieList.createSkeleton();
};
