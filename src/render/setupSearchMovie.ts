import moveList from '../components/MovieList';
import { FetchStandard, FetchType } from '../types/fetcherType';

export default (fetchStandard: FetchStandard) => {
  if (fetchStandard.type === FetchType.Popular) return;

  moveList.setListName(fetchStandard.type, fetchStandard.keyword);
  moveList.cleanMovieList();
  moveList.showSkeleton();
};
