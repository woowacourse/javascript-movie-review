import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { MovieList, MovieListProps } from '../MovieList';

const MovieChartActions = () => {
  const MovieListComponent = (props: MovieListProps) => {
    return (
      debounce(() => {
        replaceComponent($(`#MovieList`), MovieList(props));
      })() && ''
    );
  };
  return { MovieListComponent };
};

export const { MovieListComponent } = MovieChartActions();
