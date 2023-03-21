import { Movie, MovieProps } from '../Movie';
import { absorb } from '../../core';

const MovieListActions = () => {
  const MovieComponent = (props: MovieProps) => {
    absorb(`#Movie-${props.info.id}`, Movie(props));
  };
  return { MovieComponent };
};

export const { MovieComponent } = MovieListActions();
