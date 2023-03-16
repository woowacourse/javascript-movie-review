import { FetchStandard, FetchType } from '../app';
import moveList from '../components/MoiveList';

export default (fetchStandard: FetchStandard) => {
  if (fetchStandard.type === FetchType.Popular) return;

  moveList.setListName(fetchStandard.type, fetchStandard.keyword);
  moveList.cleanMovieList();
  moveList.createSkeleton();
};
