import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';
import { setComponentList } from '../../core';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    setComponentList(`#MovieList`, MovieList(props));

    return '';
    return (
      debounce(() => {
        replaceComponent($(`#MovieList`), MovieList(props));
      })() && ''
    );
  };

  const SkeletonMovieListComponent = () => {
    setComponentList(`#SkeletonList`, SkeletonMovieList({}));

    return '';
    return (
      debounce(() => {
        replaceComponent($(`#SkeletonList`), SkeletonMovieList({}));
      })() && ''
    );
  };
  return { MovieListComponent, SkeletonMovieListComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent } = MovieChartActions();
