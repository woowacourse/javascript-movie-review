import { MovieType } from '../types';
import { $ } from '../utils/domSelector';
import movieItem from './movieItem';

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
