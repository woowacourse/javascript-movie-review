// src/App.ts
import TmdbApi from './domain/tmdbApi.js';
import MovieService from './domain/MovieService.js';
import SearchBar from './components/search/SearchBar.js';
import MovieListHandler from './handlers/MovieListHandler.js';
import SearchHandler from './handlers/SearchHandler.js';
import Logo from './components/header/Logo.js';

export default class App {
  private api: TmdbApi;
  private movieService: MovieService;
  private movieListHandler: MovieListHandler;
  private searchHandler: SearchHandler;

  constructor() {
    this.api = new TmdbApi(
      import.meta.env.VITE_API_TOKEN || '',
      import.meta.env.VITE_BASE_URL || '',
    );

    this.movieService = new MovieService(this.api);
    this.movieListHandler = new MovieListHandler(this.movieService);
    this.searchHandler = new SearchHandler(this.movieListHandler);
  }

  async initialize(): Promise<void> {
    try {
      this.initializeUIComponents();
      await this.movieListHandler.loadMovies();
    } catch (error) {
      console.error('애플리케이션 초기화 실패:', error);
    }
  }

  private initializeUIComponents(): void {
    const searchBar = new SearchBar(this.searchHandler);
    searchBar.createSearchBar();

    const logo = new Logo(this.movieListHandler);
    logo.createLogo();
  }
}
