import type { TMDBResponse } from './types/tmdb';
import movieService from './domain/movieService';
import * as dom from './dom';
import { $ } from './utils/domUtils';
import { getPopularMovies, getSearchMovies } from './api';
import { MAXIMUM_PAGE, POPULAR_TITLE } from './constants';

class App {
  pageNumber: number;
  pageCategory: 'home' | 'search';
  searchQuery: string;

  constructor() {
    this.pageNumber = 1;
    this.pageCategory = 'home';
    this.searchQuery = '';

    this.initMoviePage(POPULAR_TITLE);
    this.bindEvents();
    this.updateMoviePage(getPopularMovies, { page: this.pageNumber });
  }

  bindEvents() {
    $('movie-header')?.addEventListener('home', () => {
      this.pageCategory = 'home';
      this.initMoviePage(POPULAR_TITLE);
      this.updateMoviePage(getPopularMovies, { page: this.pageNumber });
    });

    $('movie-header')?.addEventListener('search', (e) => {
      this.pageCategory = 'search';
      this.searchQuery = (<CustomEvent>e).detail.query;
      this.initMoviePage(`"${this.searchQuery}" 검색 결과`);
      this.updateMoviePage(getSearchMovies, { query: this.searchQuery, page: this.pageNumber });
    });

    $('#page')?.addEventListener('loadMore', () => {
      if (this.pageCategory === 'home') {
        this.updateMoviePage(getPopularMovies, { page: this.pageNumber });
      } else {
        this.updateMoviePage(getSearchMovies, { query: this.searchQuery, page: this.pageNumber });
      }
    });
  }

  initMoviePage(title: string) {
    this.pageNumber = 1;
    movieService.resetMovies();
    dom.renderMoviePage(title);
  }

  async updateMoviePage<T>(api: (params: T) => Promise<TMDBResponse>, params: T) {
    try {
      dom.show('#skeleton-list');
      const { results, total_pages } = await api(params);
      dom.hide('#skeleton-list');
      if (this.pageNumber >= total_pages || this.pageNumber >= MAXIMUM_PAGE) dom.hide('#load-more');

      this.pageNumber += 1;
      const newMovies = movieService.resultsToMovies(results);
      movieService.concatMovies(newMovies);
      dom.renderMovieListItem(newMovies);
    } catch {
      dom.renderErrorPage();
    }
  }
}

export default App;
