import { dataStateStore } from '../model';
import {
  DataFetcher,
  renderAlertModalForNullEl,
  SearchBoxResponsiveHandler,
  SkeletonController,
} from '../service';
import { createElementWithAttribute } from '../utils';

import { MovieListContainer } from './movie';
import SearchBox from './SearchBox';

const HeaderClickHandler = {
  async handleDataFetcher() {
    const dataFetcher = new DataFetcher({
      show: SkeletonController.showSkeletonListContainer,
      hide: SkeletonController.hideSkeletonListContainer,
    });

    await dataFetcher.handleGetPopularMovieData(true);
  },

  async handleClickToRefresh() {
    this.private_removeMovieListContainer();
    this.private_resetSearchInputValue();

    await this.handleDataFetcher();
    new MovieListContainer({
      titleText: '지금 인기 있는 영화',
      movieData: dataStateStore.movieData,
      listType: 'popular',
    });

    SearchBoxResponsiveHandler.handleSizeByLogoButton();
  },

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
    const $logo = createElementWithAttribute('button', {
      class: 'logo',
      title: 'MovieList 로고',
    });

    $logo.addEventListener('click', () =>
      HeaderClickHandler.handleClickToRefresh(),
    );

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
