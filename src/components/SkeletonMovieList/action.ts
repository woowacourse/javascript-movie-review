import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { SkeletonMovie } from '../SkeletonMovie';

const SkeletonMovieListActions = () => {
  const SkeletonMovieComponent = (props: { id: number }) => {
    return (
      debounce(() => {
        replaceComponent($(`#SkeletonMovie-${props.id}`), SkeletonMovie(props));
      })() && ''
    );
  };
  return { SkeletonMovieComponent };
};

export const { SkeletonMovieComponent } = SkeletonMovieListActions();
