import { MovieType } from '../types';
import { $ } from '../utils/domSelector';
import movieItem from './movieItem';

class MovieList {
  render(listTitle: string, movieInfoList: MovieType[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');
    const template = `
      <h2>${listTitle}</h2>
      <ul class="item-list">${itemListContents}</ul>`;

    $('.item-view').innerHTML = template;
  }

  renderAtEnd(movieInfoList: MovieType[]) {
    const itemListContents = movieInfoList.map((movieInfo) => movieItem(movieInfo)).join('');

    $('.item-list').insertAdjacentHTML('beforeend', itemListContents);
  }
}

export default MovieList;
