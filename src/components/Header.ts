// components
import Component from './core/Component';
import MovieSearchList from './MovieList/MovieSearchList';

import { MOVIE_APP_IMG_PATH } from '../constant/index';
import { $ } from '../utils/domHelper';

export default class Header extends Component {
  $target;

  state;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
    this.state = this.useState();
  }

  template() {
    return `
      <h1><img src="${MOVIE_APP_IMG_PATH.logo}" alt="MovieList 로고" class="logo" /></h1>
      <form class="search-box">
        <input id="searchMovie" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();

    return this;
  }

  addEvent(eventTarget: HTMLFormElement) {
    const { searchMovie } = eventTarget;

    this.state.setValue('isSearched', true);

    $('.item-list').innerHTML = '';

    new MovieSearchList($('.item-list')).emit(searchMovie.value);
  }

  setEvent() {
    this.$target.addEventListener('submit', (e) => {
      e.preventDefault();

      if (e.target instanceof HTMLFormElement) {
        this.addEvent(e.target);
      }
    });
  }
}
