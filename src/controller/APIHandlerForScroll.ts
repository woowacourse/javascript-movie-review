import { movieListDataFetcher } from '../model';
import { ListType } from '../type/movie';
import { ElementFinder } from '../utils';
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
      await movieListDataFetcher.handleGetPopularMovieData();
      return;
    }

    await this.private_getSearchMovieData();
  },

  private_getSearchInputValue() {
    const $searchInput =
      ElementFinder.findElementBySelector<HTMLInputElement>('#search-input');

    if (!$searchInput) return;

    return $searchInput.value;
  },

  async private_getSearchMovieData() {
    const title = this.private_getSearchInputValue();
    if (!title) return;

    await movieListDataFetcher.handleGetSearchMovieData(title, false);
  },
};

export default APIHandlerForScroll;
