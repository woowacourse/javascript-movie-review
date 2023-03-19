import moveList from '../components/MovieList';
import { FetchStandard } from '../app';

export default (fetchStandard: FetchStandard) => {
  moveList.setListName(fetchStandard.type);
  moveList.cleanMovieList();
  moveList.showSkeleton();
};
