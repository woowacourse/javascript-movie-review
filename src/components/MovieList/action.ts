import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { Movie, MovieProps } from '../Movie';

const MovieListActions = () => {
  const MovieComponent = (props: MovieProps) => {
    return (
      debounce(() => {
        replaceComponent($(`#Movie-${props.info.id}`), Movie(props));
      })() && ''
    );
  };
  return { MovieComponent };
};

export const { MovieComponent } = MovieListActions();
