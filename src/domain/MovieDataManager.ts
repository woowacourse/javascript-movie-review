import {
  CurrentTab,
  ResponseInfo,
  TotalMovieInfoType,
} from "../@types/movieDataType";
import { DATA } from "../constants/data";
import { $ } from "../utils/selector";

class MovieDataManager {
  private _currentTab = CurrentTab.POPULAR;
  private _currentPage: number = DATA.INIT_PAGE;

  getCurrentTab() {
    return this._currentTab;
  }

  getCurrenPage() {
    return this._currentPage;
  }

  convertTab(convertTarget: CurrentTab) {
    this.reset();
    this._currentTab = convertTarget;
  }

  reset() {
    const itemList = $(".item-list") as HTMLUListElement;
    const title = $("h2") as HTMLElement;

    itemList.innerHTML = "";
    title.remove();
    this._currentPage = DATA.INIT_PAGE;
  }

  updatePage() {
    this._currentPage++;
  }

  getTitle() {
    return this._currentTab === CurrentTab.POPULAR
      ? "지금 인기있는 영화"
      : "의 검색결과";
  }

  checkIsLastPage(response: ResponseInfo) {
    return response?.total_pages === response?.page;
  }

  checkDataAmount(results: TotalMovieInfoType[]) {
    return results?.length;
  }
}

export default MovieDataManager;
