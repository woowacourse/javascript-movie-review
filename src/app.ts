import render from './render';
import getAPI from './domain/getAPI';
import fetchJson from './domain/fetchJson';
import { processMovieData } from './domain/processMovieData';
import { FetchedMovieJson } from './@types/fetchJsonType';
import { FetchStandard, FetchType } from './@types/fetchType';

class App {
  private fetchStandard: FetchStandard = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
    this.initLoad();
  }

  loadMovieList() {
    const isPopularMovieList = this.fetchStandard.type === FetchType.Popular;

    try {
      if (isPopularMovieList) this.loadPopularMovieList();
      else this.loadSearchedMovieList();
    } catch (error) {
      render.apiError();
    }
  }

  async loadPopularMovieList() {
    const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
    render.updateMovieList(movieData, this.fetchStandard);
  }

  async loadSearchedMovieList() {
    if (this.fetchStandard.type === FetchType.Popular) return;

    const movieData = await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword!, this.fetchStandard.page));
    render.updateMovieList(movieData, this.fetchStandard);
  }

  loadMoreMovies() {
    this.fetchStandard.page += 1;

    render.createSkeleton();

    this.loadMovieList();
  }

  searchMovies({ detail }: CustomEvent) {
    const { keyword } = detail;
    this.fetchStandard = { page: 1, type: FetchType.Search, keyword };

    render.setupSearchMovie(this.fetchStandard);

    this.loadMovieList();
  }

  moveHome() {
    this.fetchStandard = { page: 1, type: FetchType.Popular };

    render.setupPopularMovie(this.fetchStandard);

    this.loadMovieList();
  }

  initLoad() {
    render.init();
    render.createSkeleton();

    this.loadMovieList();
  }

  async getMovieData(api: string) {
    const moviesJson = await fetchJson<FetchedMovieJson>(api);

    return processMovieData(moviesJson);
  }

  initEventHandler() {
    document.addEventListener('seeMoreMovie', this.loadMoreMovies.bind(this) as EventListener);
    document.addEventListener('searchMovies', this.searchMovies.bind(this) as unknown as EventListener);
    document.addEventListener('moveHome', this.moveHome.bind(this));
  }
}

export default App;
