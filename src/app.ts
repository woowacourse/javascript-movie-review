import { FetchedMovieJson } from './@types/fetchJsonType';
import { FetchStandard, FetchType } from './@types/fetchType';
import fetchJson from './domain/fetchJson';
import getAPI from './domain/getAPI';
import { dataProcessors } from './domain/processMovieData';
import render from './render';

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

  searchMovies(event: Event) {
    const {
      detail: { keyword },
    } = event as Event & { detail: { keyword: string } };

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

    return dataProcessors.processMovieData(moviesJson);
  }

  initEventHandler() {
    document.addEventListener('seeMoreMovie', this.loadMoreMovies.bind(this));
    document.addEventListener('searchMovies', this.searchMovies.bind(this));
    document.addEventListener('moveHome', this.moveHome.bind(this));
  }
}

export default App;
