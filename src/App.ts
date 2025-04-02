// src/App.ts
import {
  getPopularMovies,
  searchMovies,
  getMovieDetail,
} from './api/tmdb/tmdbApiService';
import MovieService from './domain/MovieService';
import SearchBar from './components/search/SearchBar';
import MovieListHandler from './handlers/MovieListHandler';
import SearchHandler from './handlers/SearchHandler';
import Logo from './components/header/Logo';
import Logger from './utils/logger/Logger';

export default class App {
  private movieService: MovieService;
  private movieListHandler: MovieListHandler;
  private searchHandler: SearchHandler;
  private logo: Logo;

  constructor() {
    this.movieService = new MovieService({
      getPopularMovies,
      searchMovies,
      getMovieDetail,
    });

    this.movieListHandler = new MovieListHandler(this.movieService);
    this.searchHandler = new SearchHandler();
    this.logo = new Logo();
    this.connectHandlers();
  }

  private connectHandlers(): void {
    this.searchHandler.onSearch = async query => {
      await this.movieListHandler.loadMovies(query);
    };

    this.logo.onClick = async () => {
      await this.movieListHandler.loadMovies();
    };
  }

  async initialize(): Promise<void> {
    try {
      this.initializeUIComponents();
      await this.movieListHandler.loadMovies();
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('애플리케이션 초기화 실패:', error as Error);
      throw error;
    }
  }

  private initializeUIComponents(): void {
    const searchBar = new SearchBar(this.searchHandler);
    searchBar.createSearchBar();
    this.logo.createLogo();
  }
}
