import { Movie, MovieDataResult, MovieFetchFunction, MovieGenre } from '../types/movie';
import {
  MOVIE_LIST_ERROR,
  MOVIE_LIST_LOADED,
  MOVIE_LIST_LOADING,
  MOVIE_LIST_RESET,
  MOVIE_RETRIEVED,
  MOVIE_USER_VOTE_UPDATED,
} from '../constants';
import EventEmitter from '../utils/EventEmitter';
import {
  fetchMovieGenreData,
  fetchPopularMovieData,
  fetchSearchedMovieData,
} from '../api/movieAPI';
import { getLocalStorage } from '../utils/localStorage';

// TODO: MovieApi랑 MovieList 도메인 두 개로 나누기! -> api related should go inside api related because it's api related it can have local storage data and I can add it via constructor
class MovieList {
  private static instance: MovieList;
  private movies: Movie[] = [];
  private userMovies: Movie[] = getLocalStorage() ?? [];
  private movieGenres: MovieGenre[] = [];
  private currentPage: number = 1;
  private searchQuery: string = '';

  constructor() {
    this.getMovieGenre();
  }

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

  private convertMovieGenreId(genreIds: number[]) {
    const selectedGenres = this.movieGenres.filter((genre) => genreIds.includes(genre.id));

    return selectedGenres.map((genre) => genre.name);
  }

  private getUserMovieVote(movieId: number) {
    if (!this.userMovies.length) return 0;

    const movie = this.userMovies.filter((movie) => movie.id === movieId)[0];

    return movie ? movie.userVote : 0;
  }

  private async processMovieData(fetchFunction: MovieFetchFunction): Promise<Movie[]> {
    const moviesData: MovieDataResult[] = await fetchFunction();
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: MovieDataResult) => ({
      id: movie.id,
      title: movie.title,
      genres: this.convertMovieGenreId(movie.genreIds),
      releaseDate: movie.releaseDate,
      voteAverage: Math.round(movie.voteAverage * 10) / 10,
      userVote: this.getUserMovieVote(movie.id),
      overview: movie.overview,
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

  async getMovieGenre() {
    this.movieGenres = await fetchMovieGenreData();
  }

  getMovieInformation(movieId: number, isBackButton: boolean = false) {
    const [movie] = this.movies.filter((movie) => movie.id === movieId);

    EventEmitter.emit(MOVIE_RETRIEVED, { movie, searchQuery: this.searchQuery, isBackButton });
  }

  getUserMovies() {
    return [...this.userMovies];
  }

  updateUserVote(movieId: number, userVote: number) {
    const hasMovie = this.userMovies.find((movie) => movie.id === movieId);

    if (hasMovie) {
      this.userMovies = this.userMovies.map((movie: Movie) => {
        if (movie.id === movieId) {
          movie.userVote = userVote;
        }

        return movie;
      });
    } else {
      const movie = this.movies.filter((movie) => movie.id === movieId)[0];
      movie.userVote = userVote;
      this.userMovies.push(movie);
    }

    EventEmitter.emit(MOVIE_USER_VOTE_UPDATED, { userVote: userVote });
  }

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    EventEmitter.on(eventName, callback);
  }
}

export default MovieList.getInstance();
