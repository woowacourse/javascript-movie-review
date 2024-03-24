import { dataStateStore } from '../model';
import {
  DataFetcher,
  SkeletonController,
  renderAlertModalForNullEl,
} from '../service';
import { ListType, Movie } from '../type/movie';
import { createElementWithAttribute, debouceFunc } from '../utils';

import MovieList from './movie/MovieList';

const dataFetcher = new DataFetcher({
  show: SkeletonController.showSkeleton,
  hide: SkeletonController.hideSkeleton,
});

/**
 * 더보기 버튼 클릭 시, 이루어지는 api 통신 관리하는 핸들러
 */
const APIHandlerForMoreButton = {
  /**
   *  영화 리스트 타입에 따라 관련된 데이터를 불러와서 영화 리스트를 업데이트한다.
   * @param {ListType} listType : 현재 보여지는 영화 리스트
   */
  async handleGetMovieData(listType: ListType) {
    if (listType === 'popular') {
      await dataFetcher.handleGetPopularMovieData();
      return;
    }

    await this.private_getSearchMovieData();
  },

  private_getSearchInputValue() {
    const $searchInput = document.querySelector('#search-input');

    if (!($searchInput instanceof HTMLInputElement)) return;

    return $searchInput.value;
  },

  async private_getSearchMovieData() {
    const title = this.private_getSearchInputValue();
    if (!title) return;

    await dataFetcher.handleGetSearchMovieData(title, false);
  },
};

/**
 * 더 보기 버튼 클릭 후, 새로 불러온 영화 리스트를 화면에 추가하는 핸들러
 */
const ChangedUIRenderingHandler = {
  /**
   * 데이터를 사용해 화면에 영화 리스트를 구현한다.
   */
  updateMovieList(event: Event) {
    const previousScrollPosition = window.scrollY;

    const { movieList, isShowMoreButton } = dataStateStore.movieData;

    this.private_addItemsToMovieList(movieList);
    this.private_changeMoreButtonState(event, isShowMoreButton);

    window.scrollTo(0, previousScrollPosition);
  },

  private_isParentElement($parentElement: Element | null) {
    if (!$parentElement) {
      renderAlertModalForNullEl('movie-list-container');
      return;
    }
  },

  private_addItemsToMovieList(totalMovieList: Movie[]) {
    const $itemList = document.querySelector(
      '.movie-list-container .movie-list',
    );

    if (!$itemList) return;

    const $newItemList = new MovieList(totalMovieList).element;
    const $parentElement = $itemList.parentElement;
    this.private_isParentElement($parentElement);
    ($parentElement as Element).replaceChild($newItemList, $itemList);
  },

  private_changeMoreButtonState(event: Event, isShowMoreButton: boolean) {
    const { target } = event;

    if (target instanceof HTMLButtonElement) {
      target.classList.toggle('open', isShowMoreButton);
    }
  },
};

const MoreButtonClickHandler = {
  /**
   * 영화 리스트 타입에 따라, 관련된 데이터를 불어와서 영화 리스트에 추가해 영화 리스트 ui를 변경한다.
   * @param {Event} event
   * @param  {ListType} listType : 현재 보여지는 영화 리스트
   */
  async handleMovieData(event: Event, listType: ListType) {
    // 데이터 업데이트
    await APIHandlerForMoreButton.handleGetMovieData(listType);
    // 업데이트 된 영화 리스트 ui로 구현
    ChangedUIRenderingHandler.updateMovieList(event);
  },

  handleClickMoreButton(event: Event, listType: ListType) {
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
