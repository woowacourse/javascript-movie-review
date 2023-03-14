import Header from './components/Header';
import MovieList from './components/MoiveList';

export type Movie = {
  title: string;
  backdrop_path: string;
  vote_average: number;
};

export type Movies = {
  page: number;
  results: Movie[];
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

    // API 통신

    let page = '1';

    const movies = (await this.getMovies()) as unknown as Movies;

    const moviesToRender = movies.results;

    this.movieList.updateMovieList(moviesToRender);

    // const movies: {page: number; results: Movie[]} | undefined = await this.getMovies();

    // if (!movies) return;

    // movies[0].results;
  }

  async seeMoreMovies() {
    this.page += 1;
    this.movieList.createSkeleton();

    const movies = (await this.getMovies()) as unknown as Movies;

    const moviesToRender = movies.results;

    this.movieList.updateMovieList(moviesToRender);
  }

  async getMovies() {
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=c9b417a74f38d67da13a13b782bc5ce3&language=ko-KRS&page=${this.page}`;

    const movies = await this.fetchMovies(api);

    return movies;
  }

  fetchMovies: typeof fetch = async api => {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('');
    }

    return response.json();
  };

  initEventHandler() {
    window.addEventListener('load', this.initLoad.bind(this));
    document.addEventListener('seeMoreMovie', this.seeMoreMovies.bind(this) as EventListener);
  }
}

export default App;
