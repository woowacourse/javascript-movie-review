import { MovieItemProps } from '../../types/movie';
import { renderHandler } from './render';

function MovieItem(movieItem: MovieItemProps) {
  const movieItemComponent = renderHandler(movieItem);

  return movieItemComponent;
}

export default MovieItem;
