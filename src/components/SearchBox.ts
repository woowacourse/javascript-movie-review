import {
  ENTER_KEY_CODE,
  MOBILE_WIDTH,
  UNDEFINED_INPUT_VALUE,
} from '../constants';
import { dataStateStore } from '../model';
import {
  DataFetcher,
  SearchBoxResponsiveHandler,
  SkeletonController,
} from '../service';
import { createElementWithAttribute, debouceFunc } from '../utils';

import Label from './Label';
import { ToastModal } from './modal';
import { MovieListContainer } from './movie';

const dataFetcher = new DataFetcher({
  show: SkeletonController.showSkeletonListContainer,
  hide: SkeletonController.hideSkeletonListContainer,
});

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
  handleClickSearchButton(event: Event) {
    event.stopPropagation();
    const isMobile = window.innerWidth <= MOBILE_WIDTH;
    const title = this.private_getInputValue();

    if (!isMobile || title) {
      this.searchMovie();
      return;
    }

    SearchBoxResponsiveHandler.handleSizeBySearchButton();
  },

  handleInputKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) return;

    if (keyCode === ENTER_KEY_CODE) {
      debouceFunc(() => SearchBoxHandler.searchMovie());
    }
  },

  async searchMovie() {
    const title = this.private_getInputValue();
    this.private_renderToastModal(title);
    if (!title) return;
    toastModal.removeToastModal(true);
    await dataFetcher.handleGetSearchMovieData(title.trim(), true);
    document.querySelector('.movie-list-container')?.remove();
    new MovieListContainer({
      titleText: `"${title}" 검색 결과`,
      movieData: dataStateStore.movieData,
      listType: 'search',
    });
  },

  private_getInputValue() {
    const title = this.private_getSearchInputValue();
    return title;
  },

  private_getSearchInputValue() {
    const $searchInput = document.querySelector('#search-input');
    if (!($searchInput instanceof HTMLInputElement)) return;
    const title = $searchInput.value;

    return title;
  },

  private_renderToastModal(title: string | undefined) {
    const renderingCondition = !title || !title.trim();
    if (renderingCondition) {
      const $header = document.querySelector('header');
      toastModal.handleRenderingToastModal($header);
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
      class: 'search-input',
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
      debouceFunc(() => SearchBoxHandler.handleClickSearchButton(event));
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
