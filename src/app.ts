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

    const movieData = await this.getMovieData();
    this.movieList.updateMovieList(movieData.movies);
  }

  async seeMoreMovies() {
    this.page += 1;
    this.movieList.createSkeleton();

    const movieData = await this.getMovieData();
    this.movieList.updateMovieList(movieData.movies);
  }

  async getMovieData() {
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=c9b417a74f38d67da13a13b782bc5ce3&language=ko-KRS&page=${this.page}`;
    const moviesJson = await fetchJson<MovieFetchedJson>(api);

    return processMovieData(moviesJson);
  }

  fetchMovies = async <T>(api: string): Promise<T> => {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  initEventHandler() {
    window.addEventListener('load', this.initLoad.bind(this));
    document.addEventListener('seeMoreMovie', this.seeMoreMovies.bind(this) as EventListener);
  }
}

export default App;
