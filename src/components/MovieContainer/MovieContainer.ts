import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import uiFeedBackManager from '../../services/UIFeedBackManager';
import addInfiniteScrollEventListener from '../../services/loadMorePage';
import networkStatusEventHandler from '../NetworkStatusAlert/eventHandler';
import movieContainerEventlistener from './eventHandler';
import { renderHandler } from './render';

async function MovieContainer() {
  const moviePage = await uiFeedBackManager.fetchData(API_ENDPOINT.POPULAR(), 'GET', null, API_OPTION.headers);
  if (moviePage) renderHandler(moviePage.movies);
  addInfiniteScrollEventListener();
  networkStatusEventHandler();
  movieContainerEventlistener();
}

export default MovieContainer;
