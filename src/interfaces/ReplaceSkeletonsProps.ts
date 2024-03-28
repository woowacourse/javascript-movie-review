import MovieItemDetailModalInstance from '../typeAliases/MovieItemDetailModalInstance';
import ResponseData from './ResponseData';

interface ReplaceSkeletonsProps {
  movieItems: HTMLUListElement;
  responseData: ResponseData;
  moiveItemDetailModal: MovieItemDetailModalInstance;
}

export default ReplaceSkeletonsProps;
