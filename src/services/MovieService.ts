import MatchedMovies from '../api/MatchedMovies';
import PopularMovies from '../api/PopularMovies';
import { SETTING } from '../constants/setting';
import { ResponseMovieItem } from '../types/ResponseMovieItem';

interface MovieService {
  query?: string;
  currentPage: number;
  isLastPage: boolean;
  totalItems: number;

  fetchMovies(query?: string): Promise<ResponseMovieItem[]>;
  setIsLastPage(totalPage: number): void;
  countItems(): number;
}

class PopularMoviesService implements MovieService {
  currentPage = 0;
  isLastPage = false;
  totalItems = 0;

  async fetchMovies(): Promise<ResponseMovieItem[]> {
    this.currentPage += 1;
    const movies = await PopularMovies.list({ page: this.currentPage });
    this.totalItems = movies.total_results;
    this.isLastPage = movies.total_pages <= this.currentPage;
    return movies.results;
  }

  setIsLastPage(totalPage: number) {
    this.isLastPage = this.currentPage >= totalPage;
  }

  countItems() {
    if (this.isLastPage) return this.totalItems % SETTING.itemsOnPage;
    return SETTING.itemsOnPage;
  }

  reset() {
    this.currentPage = 0;
    this.isLastPage = false;
    this.totalItems = 0;
  }
}

class MatchedMoviesService implements MovieService {
  query = '';
  currentPage = 0;
  isLastPage = false;
  totalItems = 0;
  constructor(query: string) {
    this.query = query;
  }
  async fetchMovies(): Promise<ResponseMovieItem[]> {
    this.currentPage += 1;
    const movies = await MatchedMovies.list({ page: this.currentPage, query: this.query });
    this.totalItems = movies.total_results;
    this.isLastPage = movies.total_pages == this.currentPage;
    return movies.results;
  }

  setIsLastPage(totalPage: number) {
    this.isLastPage = this.currentPage >= totalPage;
  }

  countItems() {
    if (this.isLastPage) return this.totalItems % SETTING.itemsOnPage;
    return SETTING.itemsOnPage;
  }

  reset() {
    this.currentPage = 0;
    this.isLastPage = false;
    this.totalItems = 0;
  }
}

export { MovieService, PopularMoviesService, MatchedMoviesService };
