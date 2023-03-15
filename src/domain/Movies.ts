import { getApiPopularMovie, getApiSearchMovie } from './api';
import Observable from './Observable';
import MovieListApiType from '../type/movie';

class Movies extends Observable {
  private popularPage = 1;
  private searchPage = 1;
  private isSearched = false;
  private query = '';

  constructor() {
    super();

    this.setMovies();
  }

  getTitle() {
    return this.isSearched
      ? `"${this.query}" 검색 결과`
      : '가장 인기 있는 영화';
  }

  getIsSearched() {
    return this.isSearched;
  }

  getQuery() {
    return this.query;
  }

  async setMovies() {
    const popularMovies = await getApiPopularMovie<MovieListApiType>(
      this.popularPage++
    );

    const refineMovies = popularMovies.results.map(
      ({ id, poster_path, title, vote_average }) => {
        return { id, poster_path, title, vote_average };
      }
    );

    this.isSearched = false;
    this.notify('movies', refineMovies);
  }

  async searchMovies(query: string) {
    this.query = query;
    const searchMovies = await getApiSearchMovie<MovieListApiType>(
      query,
      this.searchPage++
    );
    const refineMovies = searchMovies.results.map(
      ({ id, poster_path, title, vote_average }) => {
        return { id, poster_path, title, vote_average };
      }
    );

    this.isSearched = true;
    this.notify('movies', refineMovies);
  }
}

const movies = new Movies();
export default movies;
