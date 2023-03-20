import render from './render';
import getAPI from './domain/getAPI';
import { processMovieData } from './domain/processMovieData';
import { FetchStandard, FetchType } from './types/fetcherType';
import fetchJson from './domain/fetchJson';
import { FetchedMovieJson } from './types/fetchedMovie';

class App {
  private fetchStandard: FetchStandard = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
  }

  async initMovieList() {
    const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
    render.updateMoveList(movieData, this.fetchStandard);
  }

  async showMoreMovieList() {
    const movieData =
      this.fetchStandard.type === FetchType.Popular
        ? await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page))
        : await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword, this.fetchStandard.page));
    render.updateMoveList(movieData, this.fetchStandard);
  }

  async showSearchedMovieList() {
    if (this.fetchStandard.type === FetchType.Popular) return;

    const movieData = await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword!, this.fetchStandard.page));
    render.updateMoveList(movieData, this.fetchStandard);
  }

  async initLoad() {
    render.init();

    render.createSkeleton();

    try {
      await this.initMovieList();
    } catch {
      render.apiError();
    }
  }

  async seeMoreMovies() {
    this.fetchStandard.page += 1;

    render.createSkeleton();

    try {
      await this.showMoreMovieList();
    } catch {
      render.apiError();
    }
  }

  async searchMovies({ detail }: CustomEvent) {
    const { keyword } = detail;
    this.fetchStandard = { page: 1, type: FetchType.Search, keyword };

    render.setupSearchMovie(this.fetchStandard);

    try {
      this.showSearchedMovieList();
    } catch {
      render.apiError();
    }
  }

  async getMovieData(api: string) {
    const moviesJson = await fetchJson<FetchedMovieJson>(api);

    return processMovieData(moviesJson);
  }

  async moveHome() {
    this.fetchStandard = { page: 1, type: FetchType.Popular };

    render.setupPopularMovie(this.fetchStandard);

    try {
      await this.showMoreMovieList();
    } catch {
      render.apiError();
    }
  }

  initEventHandler() {
    window.addEventListener('load', this.initLoad.bind(this));
    document.addEventListener('seeMoreMovie', this.seeMoreMovies.bind(this) as EventListener);
    document.addEventListener('searchMovies', this.searchMovies.bind(this) as unknown as EventListener);
    document.addEventListener('click-logo', this.moveHome.bind(this));
  }
}

export default App;
