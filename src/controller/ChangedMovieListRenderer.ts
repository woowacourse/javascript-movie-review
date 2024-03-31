import { MovieList } from '../components';
import {
  MOVIE_LIST_CLASS,
  MOVIE_LIST_CONTAINER_CLASS,
  OBSERVER_TARGET,
} from '../constants';
import { dataStateStore } from '../model';
import { Movie } from '../type/movie';
import { ElementFinder } from '../utils';

/**
 * 스크롤링 후, 새로 불러온 영화 리스트를 화면에 추가하는 핸들러
 */
const ChangedMovieListRenderer = {
  /**
   * 데이터를 사용해 화면에 영화 리스트를 구현한다.
   */
  updateMovieList() {
    const { movieList, isMoreData } = dataStateStore.movieData;

    this.private_addItemsToMovieList(movieList, isMoreData);

    if (!isMoreData) {
      this.private_showNoMoreData();
    }
  },

  /**
   * 새로운 데이터에 따라 생선된 MovieList를  기존의 MovieList와 바꾸는 기능
   */
  private_addItemsToMovieList(totalMovieList: Movie[], isMoreData: boolean) {
    const $movieListContainer = ElementFinder.findElementBySelector(
      `.${MOVIE_LIST_CONTAINER_CLASS}`,
    );
    if (!$movieListContainer) return;
    const $itemList = ElementFinder.findElementBySelector(
      `.${MOVIE_LIST_CONTAINER_CLASS} .${MOVIE_LIST_CLASS}`,
    );
    if (!$itemList) return;

    const $newItemList = new MovieList(totalMovieList, isMoreData).element;
    $movieListContainer.replaceChild($newItemList, $itemList);
  },

  /**
   * 불러올 데이터가 더 존재하는 지 않을 경우, scroll-observer-target 클래스를 지워서 NoMoreData를 보여주는 기능
   */
  private_showNoMoreData() {
    const $movieListLastItem = ElementFinder.findElementBySelector(
      `.${MOVIE_LIST_CLASS}__last-item`,
    );

    if (!$movieListLastItem) return;

    $movieListLastItem.classList.remove(OBSERVER_TARGET.scroll);
  },
};

export default ChangedMovieListRenderer;
