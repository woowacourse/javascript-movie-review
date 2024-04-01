import { ListType } from '../type/movie';
import { ElementFinder } from '../utils';

import { movieListDataFetcher } from './DataFetcher';

/**
 * 스크롤 시, 이루어지는 api 통신 관리하는 핸들러
 */
const APIHandlerForScroll = {
  /**
   *  영화 리스트 타입에 따라 관련된 데이터를 불러와서 영화 리스트를 업데이트한다.
   * @param {ListType} listType : 현재 보여지는 영화 리스트
   */
  async getMovieListData(listType: ListType) {
    if (listType === 'popular') {
      await movieListDataFetcher.getPopularMovieListData();
      return;
    }

    await this.private_getSearchMovieListData();
  },

  private_getSearchInputValue() {
    const $searchInput =
      ElementFinder.findElementBySelector<HTMLInputElement>('#search-input');

    if (!$searchInput) return;

    return $searchInput.value;
  },

  async private_getSearchMovieListData() {
    const title = this.private_getSearchInputValue();
    if (!title) return;

    await movieListDataFetcher.getSearchMovieListData(title, false);
  },
};

export default APIHandlerForScroll;
