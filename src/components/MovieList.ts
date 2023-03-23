import { MOVIE_LIST_TITLE } from '../constants';
import { Movie } from '../types';
import { $, $$ } from '../utils/domSelector';
import movieItem from './movieItem';
import skeletonItem from './skeletonItem';

class MovieList {
  getListTitleTemplate(listTitle: string = MOVIE_LIST_TITLE.POPULARITY) {
    return `
      <h2 id="movie-list-title">${listTitle}</h2>
      <ul class="item-list"></ul>`;
  }

  setTitle(listTitle: string) {
    $('#movie-list-title').textContent = listTitle;
  }

  renderSkeletonItems(count: number = 20) {
    const skeletonItems = skeletonItem().repeat(count);
    $('.item-list').insertAdjacentHTML('beforeend', skeletonItems);
  }

  removeSkeletonItems() {
    $$('.item-list .skeleton-item').forEach((skeletonItem) => {
      skeletonItem.remove();
    });
  }

  renderContents(movieInfoList: Movie[]) {
    $('.item-list').innerHTML = movieInfoList.map(movieItem).join('');
  }

  renderNextContents(movieInfoList: Movie[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');
    $('.item-list').insertAdjacentHTML('beforeend', itemListContents);
  }

  renderNoResult(errorItemTemplate: string) {
    $('.item-list').innerHTML = errorItemTemplate;
  }
}

export default MovieList;
