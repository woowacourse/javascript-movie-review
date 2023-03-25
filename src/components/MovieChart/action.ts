import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';
import { absorb } from '../../core';
import { MovieOverviewModal, MovieOverviewModalProps } from '../MovieOverviewModal';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    absorb('#MovieList', MovieList(props));
  };

  const SkeletonMovieListComponent = () => {
    absorb('#SkeletonList', SkeletonMovieList({}));
  };

  const MovieOverviewModalComponent = (props: MovieOverviewModalProps) => {
    absorb(`#MovieOverviewModal`, MovieOverviewModal(props));
  };
  return { MovieListComponent, SkeletonMovieListComponent, MovieOverviewModalComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent, MovieOverviewModalComponent } = MovieChartActions();
