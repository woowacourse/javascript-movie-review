import {
  CurrentTab,
  MovieInfoType,
  ResponseInfo,
  TotalMovieInfoType,
} from "../@types/movieDataType";
import { getKeywordData } from "../api/keywordSearch";
import { getMovieData } from "../api/movieList";

class MovieDataManager {
  private _popularMovies: MovieInfoType[] = [];
  private _searchMovies: MovieInfoType[] = [];
  private _currentTab = CurrentTab.POPULAR;
  private _currentPage: number = 0;

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
    const itemList = document.querySelector(".item-list") as HTMLUListElement;
    itemList.innerHTML = "";
    this._currentPage = 0;
  }

  async getData(keyword: string) {
    this._currentPage++;

    if (this._currentTab === CurrentTab.POPULAR) {
      const data = await getMovieData(this._currentPage);
      this._popularMovies.push(data);
      return data;
    }
    if (this._currentTab === CurrentTab.SEARCH) {
      const data = await getKeywordData(this._currentPage, keyword);
      this._searchMovies.push(data);
      return data;
    }
  }

  checkDataPage(response: ResponseInfo) {
    return response?.total_pages === response?.page;
  }

  checkDataAmount(results: TotalMovieInfoType[]) {
    return results?.length;
  }
}

export default MovieDataManager;
