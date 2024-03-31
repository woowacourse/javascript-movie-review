import { MovieList } from '../components';
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
    const previousScrollPosition = window.scrollY;

    const { movieList, isMoreData } = dataStateStore.movieData;

    this.private_addItemsToMovieList(movieList, isMoreData);

    if (!isMoreData) {
      this.private_showNoMoreData();
    }

    window.scrollTo(0, previousScrollPosition);
  },

  /**
   * 새로운 데이터에 따라 생선된 MovieList를  기존의 MovieList와 바꾸는 기능
   */
  private_addItemsToMovieList(totalMovieList: Movie[], isMoreData: boolean) {
    const $movieListContainer = ElementFinder.findElementBySelector(
      '.movie-list-container',
    );
    if (!$movieListContainer) return;
    const $itemList = ElementFinder.findElementBySelector(
      '.movie-list-container .movie-list',
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
      '.movie-list__last-item',
    );

    if (!$movieListLastItem) return;

    $movieListLastItem.classList.remove('scroll-observer-target');
  },
};

export default ChangedMovieListRenderer;
