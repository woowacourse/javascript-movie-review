import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import uiFeedBackManager from '../../services/UIFeedBackManager';
import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import { renderHandler } from './render';

async function MovieContainer() {
  const data = await uiFeedBackManager.fetchData(API_ENDPOINT.POPULAR(), 'GET', null, API_OPTION.headers);
  const { results } = data;
  renderHandler(results);
  addShowMoreButtonEventListener();
}

export default MovieContainer;
