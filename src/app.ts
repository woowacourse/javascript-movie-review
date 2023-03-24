import { FetchedMovieDetailJson, FetchedMovieJson } from './@types/fetchJsonType';
import { FetchStandard, FetchType } from './@types/fetchType';
import MovieModal from './components/MovieModal';
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

    window.scrollTo({ top: 0, left: 0 });
    render.setupSearchMovie(this.fetchStandard);

    this.loadMovieList();
  }

  moveHome() {
    if (this.fetchStandard.type === FetchType.Search) {
      this.fetchStandard = { page: 1, type: FetchType.Popular };
      render.setupPopularMovie(this.fetchStandard);
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

    const app = document.querySelector('#app');

    if (!app) return;

    const movieModal = new MovieModal(movieId);
    app.insertAdjacentElement('beforeend', movieModal.node);

    const api = `https://api.themoviedb.org/3/movie/${movieId}?api_key=0329916a6096551557f3f4edc9e82c57&language=ko-KR`;
    const movieDetailJson = await fetchJson<FetchedMovieDetailJson>(api);
    const movieDetail = dataProcessors.processMovieDetailData(movieDetailJson);
    movieModal.updateMovieDetail(movieDetail);
  }

  closeMovieModal() {
    const $modal = document.querySelector('.modal');

    if (!$modal) return;

    $modal.remove();
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
