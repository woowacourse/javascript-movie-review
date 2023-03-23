import { SkeletonMovie } from '../SkeletonMovie';
import { absorb } from '../../core';

const SkeletonMovieListActions = () => {
  const SkeletonMovieComponent = (props: { id: number }) => {
    absorb(`#SkeletonMovie-${props.id}`, SkeletonMovie(props));
  };
  return { SkeletonMovieComponent };
};

export const { SkeletonMovieComponent } = SkeletonMovieListActions();
