import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { MovieList, MovieListProps } from '../MovieList';
import { SkeletonMovieList } from '../SkeletonMovieList';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    return (
      debounce(() => {
        replaceComponent($(`#MovieList`), MovieList(props));
      })() && ''
    );
  };

  const SkeletonMovieListComponent = () => {
    return (
      debounce(() => {
        replaceComponent($(`#SkeletonList`), SkeletonMovieList({}));
      })() && ''
    );
  };
  return { MovieListComponent, SkeletonMovieListComponent };
};

export const { MovieListComponent, SkeletonMovieListComponent } = MovieChartActions();
