import moveList from '../components/MovieList';
import { FetchStandard } from '../types/fetcherType';

export default (fetchStandard: FetchStandard) => {
  moveList.setListName(fetchStandard.type);
  moveList.cleanMovieList();
  moveList.showSkeleton();
};
