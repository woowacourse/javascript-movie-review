import { ENTER_KEYCODE } from '../constants/system';
import { dataStateStore } from '../model';
import DataFetcher from '../service/DataFetcher';
import { createElementWithAttribute, debouceFunc } from '../utils';

import Label from './Label';
import MovieListContainer from './MovieListContainer';

const SearchHandler = {
  getSearchInputValue() {
    const $searchInput = document.querySelector('#search-input');
    if (!($searchInput instanceof HTMLInputElement)) return;
    const title = $searchInput.value;

    return title;
  },

  async searchMovie() {
    const title = this.getSearchInputValue();
    console.log(title);
    if (!title) return;

    await DataFetcher.handleGetSearchMovieData(title, true);

    document.querySelector('.movie-list-container')?.remove();

    new MovieListContainer({
      titleText: `"${title}" 검색 결과`,
      movieData: dataStateStore.movieData,
      listType: 'search',
    });
  },

  handleInputKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) return;

    if (keyCode === ENTER_KEYCODE) {
      debouceFunc(() => SearchHandler.searchMovie());
    }
  },
};

class SearchBox {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeSearchBox();
  }

  get element() {
    return this.#element;
  }

  #makeSearchInput = () => {
    const $input = createElementWithAttribute('input', {
      id: 'search-input',
      type: 'text',
      placeholder: '검색',
    });

    if ($input instanceof HTMLInputElement) {
      $input.addEventListener('keydown', SearchHandler.handleInputKeydown);
    }

    return $input;
  };

  #makeSearchInputBox = () => {
    const $div = document.createElement('div');
    const $label = new Label({
      forId: 'search-input',
      textContent: '영화 검색',
      className: 'screen-reader-only',
    }).element;

    $div.appendChild($label);
    $div.appendChild(this.#makeSearchInput());

    return $div;
  };

  #makeSearchButton = () => {
    const $button = createElementWithAttribute('button', {
      class: 'search-button',
    });
    $button.textContent = '검색';

    $button.addEventListener('click', (event) => {
      event.stopPropagation();
      debouceFunc(() => SearchHandler.searchMovie());
    });

    return $button;
  };

  #makeSearchBox = () => {
    const $searchBox = createElementWithAttribute('div', {
      class: 'search-box',
    });

    $searchBox.appendChild(this.#makeSearchInputBox());
    $searchBox.appendChild(this.#makeSearchButton());

    return $searchBox;
  };
}

export default SearchBox;
