import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';
import { absorb } from '../../core';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    absorb('#MovieList', MovieList(props));
  };

  const SkeletonMovieListComponent = () => {
    absorb('#SkeletonList', SkeletonMovieList({}));
  };
  return { MovieListComponent, SkeletonMovieListComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent } = MovieChartActions();
