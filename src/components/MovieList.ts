import { MOVIE_LIST_TITLE } from '../constants';
import EventBroker from '../EventBroker';
import { Movie } from '../types';
import { $, $$ } from '../utils/domSelector';
import movieItem from './movieItem';
import skeletonItem from './skeletonItem';

class MovieList {
  getListTitleTemplate(listTitle: string = MOVIE_LIST_TITLE.POPULARITY) {
    return `
      <h2 id="movie-list-title">${listTitle}</h2>
      <ul class="item-list" id="movie-list"></ul>`;
  }

  setTitle(listTitle: string) {
    $('#movie-list-title').textContent = listTitle;
  }

  renderSkeletonItems(count: number = 20) {
    const skeletonItems = skeletonItem().repeat(count);
    $('#movie-list').insertAdjacentHTML('beforeend', skeletonItems);
  }

  removeSkeletonItems() {
    $$('#movie-list .skeleton-item').forEach((skeletonItem) => {
      skeletonItem.remove();
    });
  }

  renderContents(movieInfoList: Movie[]) {
    $('#movie-list').innerHTML = movieInfoList.map(movieItem).join('');
  }

  renderNextContents(movieInfoList: Movie[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');
    $('#movie-list').insertAdjacentHTML('beforeend', itemListContents);
  }

  renderNoResult(errorItemTemplate: string) {
    $('#movie-list').innerHTML = errorItemTemplate;
  }

  addClickEventHandler() {
    $('#movie-list').addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const movieId = event.target.closest('.item-card')?.getAttribute('data-id');

      if (!movieId) return;

      const clickMovieEvent = new CustomEvent('clickMovieEvent', { detail: { movieId: movieId } });

      EventBroker.dispatchEvent(clickMovieEvent);
    });
  }
}

export default MovieList;
