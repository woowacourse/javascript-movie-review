import { MovieType } from '../types';
import { $, $$ } from '../utils/domSelector';
import movieItem from './movieItem';
import skeletonItem from './skeletonItem';

class MovieList {
  renderListTitle(listTitle: string) {
    const template = `
      <h2>${listTitle}</h2>
      <ul class="item-list"></ul>`;

    $('.item-view').insertAdjacentHTML('beforeend', template);
  }

  setTitle(listTitle: string) {
    $('.item-view h2').textContent = listTitle;
  }

  renderSkeletonItems(count: number = 20) {
    const skeletonItems = skeletonItem().repeat(count);
    $('.item-list').insertAdjacentHTML('beforeend', skeletonItems);
  }

  removeSkeletonItems() {
    console.log($$('.item-list .skeleton-item'));
    $$('.item-list .skeleton-item').forEach((skeletonItem) => {
      console.log('OK remove');
      skeletonItem.remove();
    });
  }

  renderContents(movieInfoList: MovieType[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');
    $('.item-list').innerHTML = itemListContents;
  }

  renderNextContents(movieInfoList: MovieType[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');
    $('.item-list').insertAdjacentHTML('beforeend', itemListContents);
  }
}

export default MovieList;
