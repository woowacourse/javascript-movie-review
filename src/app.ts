import Header from './components/Header';
import MovieList from './components/MoiveList';
import fetchJson from './domain/fetchJson';
import processMovieData from './domain/processMovieData';
import getAPI from './domain/getAPI';

export type Movie = {
  title: string;
  backdropPath: string;
  voteAverage: number;
};

export type MovieFetchedJson = {
  page: number;
  results: {
    title: string;
    backdrop_path: string;
    vote_average: number;
  }[];
  total_pages: number;
};

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
  private movieList!: MovieList;
  private fetchStandard: FetchStandard = { page: 1, type: FetchType.Popular };

  constructor() {
    this.initEventHandler();
  }

  async initLoad() {
    const header = new Header();
    const app = document.querySelector('#app');

    if (!app) return;

    app.insertAdjacentElement('afterbegin', header.node);

    this.movieList = new MovieList();
    app.insertAdjacentElement('beforeend', this.movieList.node);

    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
    this.movieList.updateMovieList(movieData.movies);
  }

  async seeMoreMovies() {
    this.fetchStandard.page += 1;
    this.movieList.createSkeleton();

    if (this.fetchStandard.type === FetchType.Popular) {
      const movieData = await this.getMovieData(getAPI.popularMovie(this.fetchStandard.page));
      this.movieList.updateMovieList(movieData.movies);
    } else {
      const movieData = await this.getMovieData(
        getAPI.searchMovie(this.fetchStandard.keyword, this.fetchStandard.page)
      );
      this.movieList.updateMovieList(movieData.movies);
    }
  }

  async searchMoives({ detail }: CustomEvent) {
    const { keyword } = detail;
    this.fetchStandard = { page: 1, type: FetchType.Search, keyword };

    this.movieList.setListName(this.fetchStandard.type, this.fetchStandard.keyword);
    this.movieList.cleanMovieList();
    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getAPI.searchMovie(this.fetchStandard.keyword!, this.fetchStandard.page));
    this.movieList.updateMovieList(movieData.movies);
  }

  async getMovieData(api: string) {
    const moviesJson = await fetchJson<MovieFetchedJson>(api);

    return processMovieData(moviesJson);
  }

  initEventHandler() {
    window.addEventListener('load', this.initLoad.bind(this));
    document.addEventListener('seeMoreMovie', this.seeMoreMovies.bind(this) as EventListener);
    document.addEventListener('searchMovies', this.searchMoives.bind(this) as unknown as EventListener);
  }
}

export default App;
