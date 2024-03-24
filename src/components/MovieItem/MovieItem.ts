import { TMDBMovieDetailsResponse } from '../../types/tmdb';
import { renderHandler } from './render';

function MovieItem(movieItem: TMDBMovieDetailsResponse) {
  const movieItemComponent = renderHandler(movieItem);

  return movieItemComponent;
}

export default MovieItem;
