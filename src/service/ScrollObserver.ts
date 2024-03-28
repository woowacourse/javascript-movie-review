import { MovieList } from '../components';
import { dataStateStore } from '../model';
import { ListType, Movie } from '../type/movie';
import { debouceFunc } from '../utils';

import { renderAlertModalForNullEl } from './AlertModalForNullController';
import DataFetcher from './DataFetcher';
import SkeletonController from './SkeletonController';

const dataFetcher = new DataFetcher({
  show: SkeletonController.showSkeletonListContainer,
  hide: SkeletonController.hideSkeletonListContainer,
});
/**
 * 스크롤 시, 이루어지는 api 통신 관리하는 핸들러
 */
const APIHandlerForScroll = {
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
 * 스크롤링 후, 새로 불러온 영화 리스트를 화면에 추가하는 핸들러
 */
const ChangedUIRenderer = {
  /**
   * 데이터를 사용해 화면에 영화 리스트를 구현한다.
   */
  updateMovieList() {
    const previousScrollPosition = window.scrollY;

    const { movieList, isMoreData } = dataStateStore.movieData;

    this.private_addItemsToMovieList(movieList, isMoreData);

    if (!isMoreData) {
      this.private_showNoMoreData();
    }

    window.scrollTo(0, previousScrollPosition);
  },

  private_isParentElement($parentElement: Element | null) {
    if (!$parentElement) {
      renderAlertModalForNullEl('movie-list-container');
      return;
    }
  },
  /**
   * 새로운 데이터에 따라 생선된 MovieList를  기존의 MovieList와 바꾸는 기능
   */
  private_addItemsToMovieList(totalMovieList: Movie[], isMoreData: boolean) {
    const $itemList = document.querySelector(
      '.movie-list-container .movie-list',
    );

    if (!$itemList) return;

    const $newItemList = new MovieList(totalMovieList, isMoreData).element;
    const $parentElement = $itemList.parentElement;
    this.private_isParentElement($parentElement);
    ($parentElement as Element).replaceChild($newItemList, $itemList);
  },

  /**
   * 불러올 데이터가 더 존재하는 지 않을 경우, scroll-observer-target 클래스를 지워서 NoMoreData를 보여주는 기능
   */
  private_showNoMoreData() {
    const $movieListLastItem = document.querySelector('.movie-list__last-item');

    if (!$movieListLastItem) return;

    $movieListLastItem.classList.remove('scroll-observer-target');
  },
};

class ScrollObserver {
  #observer: IntersectionObserver;

  constructor() {
    this.#observer = this.#setObserver();
  }

  // observe
  observeTarget($target: Element) {
    this.#observer.observe($target);
  }

  // observer setting
  #setObserver() {
    return new IntersectionObserver(this.#observerCallback, {
      threshold: 1,
    });
  }

  #observerCallback: IntersectionObserverCallback = (entries) => {
    debouceFunc(() => {
      if (entries[0].isIntersecting) {
        this.handleMovieData();
      }
    });
  };

  /**
   * 영화 리스트 타입에 따라, 관련된 데이터를 불어와서 영화 리스트에 추가해 영화 리스트 ui를 변경한다.
   * @param  {ListType} listType : 현재 보여지는 영화 리스트
   */
  async handleMovieData() {
    const listType = this.#getListType();
    if (!listType) return;
    // 데이터 업데이트
    await APIHandlerForScroll.handleGetMovieData(listType);
    // 업데이트 된 영화 리스트 ui로 구현
    ChangedUIRenderer.updateMovieList();
  }

  #getListType(): ListType | undefined {
    const $movieListContainer = document.querySelector('.movie-list-container');

    if (!$movieListContainer) {
      renderAlertModalForNullEl('movie-list-container');
      return;
    }

    if (!$movieListContainer.hasAttribute('name')) return;
    const name = $movieListContainer.getAttribute('name');

    return name === 'search' ? 'search' : 'popular';
  }
}

export default ScrollObserver;
