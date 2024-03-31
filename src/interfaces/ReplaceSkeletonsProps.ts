import MovieItemDetailModalInstance from '../typeAliases/MovieItemDetailModalInstance';
import ResponseData from './ResponseData';

interface ReplaceSkeletonsProps {
  skeletonList: NodeListOf<HTMLLIElement>;
  moviesData: ResponseData;
  moiveItemDetailModal: MovieItemDetailModalInstance;
  itemList: HTMLElement;
}

export default ReplaceSkeletonsProps;
