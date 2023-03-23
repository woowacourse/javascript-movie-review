import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { SkeletonMovie } from '../SkeletonMovie';
import { setComponentList } from '../../core';

const SkeletonMovieListActions = () => {
  const SkeletonMovieComponent = (props: { id: number }) => {
    setComponentList(`#SkeletonMovie-${props.id}`, SkeletonMovie(props));

    return '';
  };
  return { SkeletonMovieComponent };
};

export const { SkeletonMovieComponent } = SkeletonMovieListActions();
