import Header from './components/Header';
import MovieList from './components/MoiveList';
import fetchJson from './domain/fetchJson';
import processMovieData from './domain/processMovieData';

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

const getAPI = (type: 'popular' | 'search') => {
  if (type === 'popular') {
    return (page: number) =>
      `https://api.themoviedb.org/3/movie/popular?api_key=c9b417a74f38d67da13a13b782bc5ce3&language=ko-KRS&page=${page}`;
  }
  return (keyword: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?api_key=0329916a6096551557f3f4edc9e82c57&language=ko-KR&query=${keyword}&page=${page}`;
};

const getApiPopular = (page: number) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=c9b417a74f38d67da13a13b782bc5ce3&language=ko-KRS&page=${page}`;
const getApiSearch = (keyword: string, page: number) =>
  `https://api.themoviedb.org/3/search/movie?api_key=0329916a6096551557f3f4edc9e82c57&language=ko-KR&query=${keyword}&page=${page}`;

class App {
  private movieList!: MovieList;
  private page: number;

  constructor() {
    this.page = 1;
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

    const movieData = await this.getMovieData(getApiPopular(this.page));
    this.movieList.updateMovieList(movieData.movies);
  }

  async seeMoreMovies() {
    this.page += 1;
    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getApiPopular(this.page));
    this.movieList.updateMovieList(movieData.movies);
  }

  async searchMoives({ detail }: CustomEvent) {
    const { keyword } = detail;

    this.page === 1;
    this.movieList.setListName(keyword);
    this.movieList.cleanMovieList();
    this.movieList.createSkeleton();

    const movieData = await this.getMovieData(getApiSearch(keyword, this.page));
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
