import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';
import { setComponentList } from '../../core';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    setComponentList(`#MovieList`, MovieList(props));

    return '';
  };

  const SkeletonMovieListComponent = () => {
    setComponentList(`#SkeletonList`, SkeletonMovieList({}));

    return '';
  };
  return { MovieListComponent, SkeletonMovieListComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent } = MovieChartActions();
