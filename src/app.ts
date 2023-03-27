import { FetchedMovieDetailJson, FetchedMovieJson } from './types/fetchJsonType';
import { MovieFetchInfo, FetchType } from './types/fetchType';
import fetchJson from './domains/fetchJson';
import getAPI from './domains/getAPI';
import { dataProcessors } from './domains/processMovieData';
import render from './render';

class App {
  private movieFetchInfo: MovieFetchInfo = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
    this.initLoad();
  }

  loadMovieList() {
    const isPopularMovieList = this.movieFetchInfo.type === FetchType.Popular;

    try {
      if (isPopularMovieList) this.loadPopularMovieList();
      else this.loadSearchedMovieList();
    } catch (error) {
      render.apiError();
    }
  }

  async loadPopularMovieList() {
    const movieData = await this.getMovieData(getAPI.popularMovie(this.movieFetchInfo.page));
    render.updateMovieList(movieData, this.movieFetchInfo);
  }

  async loadSearchedMovieList() {
    if (this.movieFetchInfo.type === FetchType.Popular) return;

    const movieData = await this.getMovieData(
      getAPI.searchMovie(this.movieFetchInfo.keyword!, this.movieFetchInfo.page)
    );
    render.updateMovieList(movieData, this.movieFetchInfo);
  }

  loadMoreMovies() {
    this.movieFetchInfo.page += 1;

    render.createSkeleton();

    this.loadMovieList();
  }

  searchMovies(event: Event) {
    const {
      detail: { keyword },
    } = event as Event & { detail: { keyword: string } };

    this.movieFetchInfo = { page: 1, type: FetchType.Search, keyword };

    window.scrollTo({ top: 0, left: 0 });
    render.setupSearchMovie(this.movieFetchInfo);

    this.loadMovieList();
  }

  moveHome() {
    if (this.movieFetchInfo.type === FetchType.Search) {
      this.movieFetchInfo = { page: 1, type: FetchType.Popular };
      render.setupPopularMovie(this.movieFetchInfo);
      this.loadMovieList();
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

  async openMovieModal(event: Event) {
    const {
      detail: { movieId },
    } = event as Event & { detail: { movieId: number } };

    render.openModal(movieId);

    const movieDetailJson = await fetchJson<FetchedMovieDetailJson>(getAPI.detailMovie(movieId));
    const movieDetail = dataProcessors.processMovieDetailData(movieDetailJson);

    render.updateModal(movieDetail);
  }

  closeMovieModal() {
    render.closeModal();
  }

  initEventHandler() {
    document.addEventListener('seeMoreMovie', this.loadMoreMovies.bind(this));
    document.addEventListener('searchMovies', this.searchMovies.bind(this));
    document.addEventListener('moveHome', this.moveHome.bind(this));
    document.addEventListener('openMovieModal', this.openMovieModal.bind(this));
    document.addEventListener('closeMovieModal', this.closeMovieModal.bind(this));
  }
}

export default App;
