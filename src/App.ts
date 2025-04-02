import {
  getPopularMovies,
  searchMovies,
  getMovieDetail,
} from './api/tmdb/tmdbApiService';
import MovieService from './domain/MovieService';
import SearchBar from './components/search/SearchBar';
import MovieListHandler from './handlers/MovieListHandler';
import Logo from './components/header/Logo';
import Logger from './utils/logger/Logger';

export default class App {
  private movieService: MovieService;
  private movieListHandler: MovieListHandler;

  constructor() {
    this.movieService = new MovieService({
      getPopularMovies,
      searchMovies,
      getMovieDetail,
    });

    this.movieListHandler = new MovieListHandler(this.movieService);
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
    const searchBar = new SearchBar((query: string | undefined) =>
      this.movieListHandler.loadMovies(query),
    );
    searchBar.createSearchBar();

    const logo = new Logo(() => this.movieListHandler.loadMovies());
    logo.createLogo();
  }
}
