import {
  CurrentTab,
  MovieInfoType,
  ResponseInfo,
  TotalMovieInfoType,
} from "../@types/movieType";
import { getKeywordData } from "../api/keywordSearch";
import { getMovieData } from "../api/movieList";
import { MovieItem } from "../components/MovieItem";

class MovieDataManager {
  private _popularMovies: MovieInfoType[] = [];
  private _searchMovies: MovieInfoType[] = [];
  private _currentTab: CurrentTab = "popular";
  private _currentPage: number = 1;

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
    document.querySelector(".item-list")!.innerHTML = "";
    this._currentPage = 0;
  }

  async getData(keyword: string) {
    this._currentPage++;

    if (this._currentTab === "popular") {
      const data = await getMovieData(this._currentPage);
      this._popularMovies.push(data);
      return data;
    }
    if (this._currentTab === "search") {
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
