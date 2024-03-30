import { renderMovieContainerComponents } from './render';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import onRenderMovieDetailModal from '../MovieItem/eventHandler';
import { initializeInfiniteScroll } from './infiniteScrollHandler';
import movieFetcher from '../../services/MovieFetcher';
import MovieStorageService from '../../services/MovieStorageService';

async function MovieContainer() {
  const dataFromServer = await movieFetcher.fetchData(API_ENDPOINT.POPULAR(), {
    headers: API_OPTION.headers,
  });
  const { results } = dataFromServer;
  const data = MovieStorageService.addData(results);

  renderMovieContainerComponents(data);
  initializeInfiniteScroll();
  onRenderMovieDetailModal();
}

export default MovieContainer;
