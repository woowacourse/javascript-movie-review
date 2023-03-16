import Header from './components/Header';
import MovieList from './components/MoiveList';
import getAPI from './domain/getAPI';
import fetchJson, { FetchedMovieJson } from './domain/fetchJson';
import { processMovieData, Movie } from './domain/processMovieData';

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
  private movieList: MovieList = new MovieList();
  private fetchStandard: FetchStandard = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
  }

  updateMovieList(movieData: Movie) {
    const isLastPage = movieData.totalPages === this.fetchStandard.page;
    this.movieList.updateMovieList(movieData.movies, isLastPage);
  }

  async initLoad() {
    const app = document.querySelector('#app');

    if (!app) return;

    app.insertAdjacentElement('afterbegin', new Header().node);
    app.insertAdjacentElement('beforeend', this.movieList.node);

    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
    this.updateMovieList(movieData);
  }

  async seeMoreMovies() {
    this.fetchStandard.page += 1;
    this.movieList.createSkeleton();

    const movieData =
      this.fetchStandard.type === FetchType.Popular
        ? await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page))
        : await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword, this.fetchStandard.page));

    this.updateMovieList(movieData);
  }

  async searchMoives({ detail }: CustomEvent) {
    const { keyword } = detail;
    this.fetchStandard = { page: 1, type: FetchType.Search, keyword };

    this.movieList.setListName(this.fetchStandard.type, this.fetchStandard.keyword);
    this.movieList.cleanMovieList();
    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword!, this.fetchStandard.page));

    this.updateMovieList(movieData);
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
