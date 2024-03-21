import { MovieData } from '../../types/movie';
import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import { renderHandler } from './render';

function MovieContainer(movieData: MovieData) {
  const { results } = movieData;
  renderHandler(results);
  addShowMoreButtonEventListener();
}

export default MovieContainer;
