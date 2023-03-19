import { FetchStandard } from '../@types/fetchType';
import moveList from '../components/MoiveList';

export default (fetchStandard: FetchStandard) => {
  moveList.setListName(fetchStandard.type);
  moveList.cleanMovieList();
  moveList.createSkeleton();
};
