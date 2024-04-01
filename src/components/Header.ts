import { MOVIE_LIST_CONTAINER_CLASS } from '../constants';
import { dataStateStore, movieListDataFetcher } from '../model';
import { createElementWithAttribute, ElementFinder } from '../utils';

import { MovieListContainer } from './movie';
import { SearchBox, SearchBoxResponsiveHandler } from './searching';

const HeaderClickHandler = {
  async handleDataFetcher() {
    await movieListDataFetcher.getPopularMovieListData(true);
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
    const $movieListContainer = ElementFinder.findElementBySelector(
      `.${MOVIE_LIST_CONTAINER_CLASS}`,
    );
    if (!$movieListContainer) return;

    $movieListContainer.remove();
  },

  private_resetSearchInputValue() {
    const $searchBox =
      ElementFinder.findElementBySelector<HTMLInputElement>('#search-input');

    if (!$searchBox) return;

    $searchBox.value = '';
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
