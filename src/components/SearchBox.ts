import { UNDEFINED_INPUT_VALUE } from '../constants';
import { ENTER_KEYCODE } from '../constants/system';
import { dataStateStore } from '../model';
import DataFetcher from '../service/DataFetcher';
import { createElementWithAttribute, debouceFunc } from '../utils';

import Label from './Label';
import ToastModal from './modal/ToastModal';
import MovieListContainer from './MovieListContainer';

const makeSearchBoxToastModal = () => {
  const $children = document.createElement('div');
  $children.textContent = UNDEFINED_INPUT_VALUE;

  return new ToastModal({
    $children,
    extraClass: 'undefined-input',
  });
};

const toastModal = makeSearchBoxToastModal();

const SearchBoxHandler = {
  async searchMovie() {
    const title = this.private_getSearchInputValue();
    if (!title || !title.trim()) {
      this.private_renderToastModal();
      return;
    }
    toastModal.removeToastModal(true);
    await DataFetcher.handleGetSearchMovieData(title.trim(), true);
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
      debouceFunc(() => SearchBoxHandler.searchMovie());
    }
  },

  private_getSearchInputValue() {
    const $searchInput = document.querySelector('#search-input');
    if (!($searchInput instanceof HTMLInputElement)) return;
    const title = $searchInput.value;

    return title;
  },

  private_renderToastModal() {
    const $header = document.querySelector('header');
    toastModal.handleRenderingToastModal($header);
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
      $input.addEventListener('keydown', SearchBoxHandler.handleInputKeydown);
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
      debouceFunc(() => SearchBoxHandler.searchMovie());
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
