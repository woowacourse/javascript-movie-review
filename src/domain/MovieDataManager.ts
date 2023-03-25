import {
  CurrentTab,
  ResponseInfo,
  TotalMovieInfoType,
} from "../@types/movieDataType";
import { MOVIE_DATA } from "../constants/data";
import { $ } from "../utils/selector";

class MovieDataManager {
  private _currentTab = CurrentTab.POPULAR;
  private _currentPage: number = MOVIE_DATA.INIT_PAGE;

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
    this._currentPage = MOVIE_DATA.INIT_PAGE;
  }

  updatePage() {
    this._currentPage++;
  }

  checkIsLastPage(response: ResponseInfo) {
    return response?.total_pages === response?.page;
  }

  checkDataAmount(results: TotalMovieInfoType[]) {
    return results?.length;
  }
}

export default MovieDataManager;
