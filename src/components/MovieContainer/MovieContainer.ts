import { MovieData } from '../../types/movie';
import showMoreButtonEventHandler from '../ShowMoreButton/eventHandler';
import { renderHandler } from './render';

function MovieContainer(movieData: MovieData) {
  const { results } = movieData;
  renderHandler(results);
  showMoreButtonEventHandler();
}

export default MovieContainer;
