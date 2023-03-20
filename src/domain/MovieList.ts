import { Movie, MovieDataResult, MovieFetchFunction } from '../types/movie';
import {
  MOVIE_LIST_ERROR,
  MOVIE_LIST_LOADED,
  MOVIE_LIST_LOADING,
  MOVIE_LIST_RESET,
  MOVIE_RETRIEVED,
} from '../constants';
import EventEmitter from '../utils/EventEmitter';
import { fetchPopularMovieData, fetchSearchedMovieData } from '../api/movieAPI';

class MovieList {
  private static instance: MovieList;
  private movies: Movie[] = [];
  private currentPage: number = 1;
  private searchQuery: string = '';

  static getInstance(): MovieList {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  init(searchQuery: string = '') {
    this.movies = [];
    this.currentPage = 1;
    this.searchQuery = searchQuery;
    EventEmitter.emit(MOVIE_LIST_RESET, searchQuery);
  }

  private increaseCurrentPage() {
    this.currentPage += 1;
  }

  private async processMovieData(fetchFunction: MovieFetchFunction): Promise<Movie[]> {
    const moviesData: MovieDataResult[] = await fetchFunction();
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: MovieDataResult) => ({
      id: movie.id,
      title: movie.title,
      voteAverage: Math.round(movie.voteAverage * 10) / 10,
      posterPath: movie.posterPath,
    }));

    this.movies = [...this.movies, ...movies];

    return movies;
  }

  private async getPopularMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchPopularMovieData(this.currentPage));
  }

  private async getSearchedMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchSearchedMovieData(this.searchQuery, this.currentPage));
  }

  async getMovieData() {
    EventEmitter.emit(MOVIE_LIST_LOADING);

    try {
      const movies =
        this.searchQuery !== ''
          ? await this.getSearchedMovieData()
          : await this.getPopularMovieData();

      EventEmitter.emit(MOVIE_LIST_LOADED, { movies, searchQuery: this.searchQuery });
    } catch (error) {
      EventEmitter.emit(MOVIE_LIST_ERROR, { error });
    }
  }

  getMovieInformation(movieId: number) {
    const [movie] = this.movies.filter((movie) => movie.id === movieId);

    EventEmitter.emit(MOVIE_RETRIEVED, { movie });
  }

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    EventEmitter.on(eventName, callback);
  }
}

export default MovieList.getInstance();
