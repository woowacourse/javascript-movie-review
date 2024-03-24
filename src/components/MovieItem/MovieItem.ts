import { Movie } from '../../domain/movie';
import { renderHandler } from './render';

function MovieItem(movie: Movie) {
  const movieItemComponent = renderHandler(movie);

  return movieItemComponent;
}

export default MovieItem;
