import { debounce } from './../../utils/common/debounce';
import { $, replaceComponent } from './../../utils/common/domHelper';
import { Movie, MovieProps } from '../Movie';
import { setComponentList } from '../../core';

const MovieListActions = () => {
  const MovieComponent = (props: MovieProps) => {
    setComponentList(`#Movie-${props.info.id}`, Movie(props));

    return;
  };
  return { MovieComponent };
};

export const { MovieComponent } = MovieListActions();
