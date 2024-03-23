import LogoImg from '../../templates/logo.png';
import { dataStateStore } from '../model';
import { renderAlertModalForNullEl } from '../service/AlertModalForNullEl';
import DataFetcher from '../service/DataFetcher';
import { createElementWithAttribute } from '../utils';

import MovieListContainer from './MovieListContainer';
import SearchBox from './SearchBox';

const HeaderClickHandler = {
  private_removeMovieListContainer() {
    const $movieListContainer = document.querySelector('.movie-list-container');

    if (!$movieListContainer) {
      renderAlertModalForNullEl('movie-list-container');
      return;
    }

    $movieListContainer.remove();
  },

  private_resetSearchInputValue() {
    const $searchBox = document.querySelector('#search-input');

    if ($searchBox instanceof HTMLInputElement) {
      $searchBox.value = '';
    }
  },

  async handleClickToRefresh() {
    this.private_removeMovieListContainer();
    this.private_resetSearchInputValue();

    await DataFetcher.handleGetPopularMovieData(true);

    new MovieListContainer({
      titleText: '지금 인기 있는 영화',
      movieData: dataStateStore.movieData,
      listType: 'popular',
    });
  },
};
class Header {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeHeader();
  }

  get element() {
    return this.#element;
  }

  #makeLogo() {
    const logoImgAttribute = {
      src: LogoImg,
      alt: 'MovieList 로고',
    };
    const $logo = createElementWithAttribute('img', logoImgAttribute);

    $logo.addEventListener('click', HeaderClickHandler.handleClickToRefresh);

    return $logo;
  }

  #makeHeader() {
    const $header = document.createElement('header');
    const $h1 = document.createElement('h1');
    const $logo = this.#makeLogo();

    $h1.appendChild($logo);
    $header.appendChild($h1);
    $header.appendChild(new SearchBox().element);

    return $header;
  }
}

export default Header;
