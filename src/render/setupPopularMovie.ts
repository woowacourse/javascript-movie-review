import moveList from '../components/MoiveList';
import { FetchStandard } from '../app';

export default (fetchStandard: FetchStandard) => {
  moveList.setListName(fetchStandard.type);
  moveList.cleanMovieList();
  moveList.createSkeleton();
};
