import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import { MoviePage } from '../../domain/movie';
import uiFeedBackManager from '../../services/UIFeedBackManager';
import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import { renderHandler } from './render';

async function MovieContainer() {
  const moviePage = await uiFeedBackManager.fetchData(API_ENDPOINT.POPULAR(), 'GET', null, API_OPTION.headers);
  if (moviePage) renderHandler(moviePage.movies);
  addShowMoreButtonEventListener();
}

export default MovieContainer;
