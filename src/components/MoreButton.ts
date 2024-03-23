import { dataStateStore } from '../model';
import { renderAlertModalForNullEl } from '../service/AlertModalForNullEl';
import DataFetcher from '../service/DataFetcher';
import { ListType, Movie } from '../type/movie';
import { createElementWithAttribute, debouceFunc } from '../utils';

import MovieList from './MovieList';

const MoreButtonClickHandler = {
  changeMoreButtonState(event: Event, isShowMoreButton: boolean) {
    const { target } = event;

    if (target instanceof HTMLButtonElement) {
      target.classList.toggle('open', isShowMoreButton);
    }
  },

  isParentElement($parentElement: Element | null) {
    if (!$parentElement) {
      renderAlertModalForNullEl('movie-list-container');
      return;
    }
  },

  addItemsToMovieList(totalMovieList: Movie[]) {
    const $itemList = document.querySelector(
      '.movie-list-container .movie-list',
    );

    if (!$itemList) return;

    const $newItemList = new MovieList(totalMovieList).element;
    const $parentElement = $itemList.parentElement;
    this.isParentElement($parentElement);
    ($parentElement as Element).replaceChild($newItemList, $itemList);
  },

  getSearchInputValue() {
    const $searchInput = document.querySelector('#search-input');

    if (!($searchInput instanceof HTMLInputElement)) return;

    return $searchInput.value;
  },

  async getSearchMovieData() {
    const title = this.getSearchInputValue();

    if (!title) return;

    await DataFetcher.handleGetSearchMovieData(title, false);
  },

  handleMovieDataState(event: Event) {
    const previousScrollPosition = window.scrollY;

    const { movieList, isShowMoreButton } = dataStateStore.movieData;

    this.addItemsToMovieList(movieList);
    this.changeMoreButtonState(event, isShowMoreButton);

    window.scrollTo(0, previousScrollPosition);
  },

  async handleMovieData(event: Event, listType: ListType) {
    if (listType === 'popular') {
      await DataFetcher.handleGetPopularMovieData();
    } else {
      await this.getSearchMovieData();
    }

    this.handleMovieDataState(event);
  },

  async handleClickMoreButton(event: Event, listType: ListType) {
    event.stopPropagation();

    debouceFunc(() => this.handleMovieData(event, listType));
  },
};

interface MoreButtonProps {
  listType: ListType;
  isShowMoreButton: boolean;
}
class MoreButton {
  constructor(props: MoreButtonProps) {
    this.#renderMoreButton(props);
  }

  // make MoreButton ----
  #makeMoreButton() {
    const $moreButton = createElementWithAttribute('button', {
      id: 'more-button',
      class: 'btn primary full-width more-button open',
    });
    $moreButton.textContent = '더 보기';

    return $moreButton;
  }

  #renderMoreButton({ listType, isShowMoreButton }: MoreButtonProps) {
    if (!isShowMoreButton) return;
    const $moreButton = this.#makeMoreButton();
    document.querySelector('.movie-list-container')?.appendChild($moreButton);

    $moreButton.addEventListener('click', (event) =>
      MoreButtonClickHandler.handleClickMoreButton(event, listType),
    );
  }
}

export default MoreButton;
