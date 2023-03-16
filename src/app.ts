import Header from './components/Header';
import MovieList from './components/MoiveList';
import getAPI from './domain/getAPI';
import fetchJson, { FetchedMovieJson } from './domain/fetchJson';
import { processMovieData, Movie } from './domain/processMovieData';
import moveList from './components/MoiveList';

export enum FetchType {
  Popular = 'popular',
  Search = 'search',
}

type PopularFetchType = {
  page: number;
  type: FetchType.Popular;
};

type SearchFetchType = {
  page: number;
  type: FetchType.Search;
  keyword: string;
};

export type FetchStandard = PopularFetchType | SearchFetchType;

class App {
  private movieList: typeof MovieList = moveList;
  private fetchStandard: FetchStandard = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
  }

  updateMovieList(movieData: Movie) {
    const isLastPage = movieData.totalPages === this.fetchStandard.page;
    moveList.updateMovieList(movieData.movies, isLastPage);
  }

  alertError() {
    moveList.removeSkeleton();
    moveList.showErrorMessage();
  }

  async initMovieList() {
    const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
    this.updateMovieList(movieData);
  }

  async showMoreMovieList() {
    const movieData =
      this.fetchStandard.type === FetchType.Popular
        ? await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page))
        : await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword, this.fetchStandard.page));
    this.updateMovieList(movieData);
  }

  async showSearchedMovieList() {
    if (this.fetchStandard.type === FetchType.Popular) return;

    const movieData = await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword!, this.fetchStandard.page));
    this.updateMovieList(movieData);
  }

  async initLoad() {
    const app = document.querySelector('#app');

    if (!app) return;

    app.insertAdjacentElement('afterbegin', new Header().node);
    app.insertAdjacentElement('beforeend', moveList.node);

    moveList.createSkeleton();

    try {
      await this.initMovieList();
    } catch {
      this.alertError();
    }
  }

  async seeMoreMovies() {
    this.fetchStandard.page += 1;
    moveList.createSkeleton();

    try {
      await this.showMoreMovieList();
    } catch {
      this.alertError();
    }
  }

  async searchMoives({ detail }: CustomEvent) {
    const { keyword } = detail;
    this.fetchStandard = { page: 1, type: FetchType.Search, keyword };

    moveList.setListName(this.fetchStandard.type, this.fetchStandard.keyword);
    moveList.cleanMovieList();
    moveList.createSkeleton();

    try {
      this.showSearchedMovieList();
    } catch {
      this.alertError();
    }
  }

  async getMovieData(api: string) {
    const moviesJson = await fetchJson<FetchedMovieJson>(api);

    return processMovieData(moviesJson);
  }

  initEventHandler() {
    window.addEventListener('load', this.initLoad.bind(this));
    document.addEventListener('seeMoreMovie', this.seeMoreMovies.bind(this) as EventListener);
    document.addEventListener('searchMovies', this.searchMoives.bind(this) as unknown as EventListener);
  }
}

export default App;
