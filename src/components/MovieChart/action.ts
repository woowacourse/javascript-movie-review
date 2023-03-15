import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { Movie, MovieProps } from '../Movie';

const MovieChartActions = () => {
  const MovieComponent = (props: MovieProps) => {
    return (
      debounce(() => {
        replaceComponent($('#Movie'), Movie(props));
      })() && ''
    );
  };
  return { MovieComponent };
};

export const { MovieComponent } = MovieChartActions();
