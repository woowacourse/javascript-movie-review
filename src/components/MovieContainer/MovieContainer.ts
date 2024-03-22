import { addShowMoreButtonEventListener } from '../ShowMoreButton/eventHandler';
import { renderHandler } from './render';
import loadingOrErrorStateUIManager from '../../services/LoadingOrErrorStateUIManager';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';

async function MovieContainer() {
  const data = await loadingOrErrorStateUIManager.fetchData(API_ENDPOINT.POPULAR(), { headers: API_OPTION.headers });
  const { results } = data;
  renderHandler(results);
  addShowMoreButtonEventListener();
}

export default MovieContainer;
