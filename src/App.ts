import { fetchPopularMovies, fetchSearchedMovies } from './api';
import { MAX_MOVIES_PER_PAGE } from './constants';
import {
  clearList,
  renderList,
  showSkeleton,
  hideSkeleton,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './dom';

import movieService, { Movie } from './domain/movieService';
import { $ } from './utils/domUtils';
import { handleError } from './utils/errorHandler';

const App = {
  isPopular: true,
  query: '',
  currentPage: 1,

  init() {
    this.bindEvents();
    this.renderPopularMovies();
  },

  bindEvents() {
    $('movie-header')?.addEventListener('home', () => this.handleLogoClick());
    $('movie-header')?.addEventListener('search', ({ detail: query }: CustomEventInit<string>) => {
      if (query === '' || !query) return;

      this.handleSearch(query);
    });
    $('movie-list-section')?.addEventListener('loadMore', () => this.handleLoadMore());
  },

  handleLogoClick() {
    this.reset();
    this.renderPopularMovies();
  },

  handleSearch(query: string) {
    if (this.query === query) return;

    this.isPopular = false;
    this.query = query;
    this.currentPage = 1;
    clearList();
    this.renderSearchedMovies();
  },

  handleLoadMore() {
    if (this.isPopular) {
      this.renderPopularMovies();
    } else {
      this.renderSearchedMovies();
    }
  },

  async renderPopularMovies() {
    try {
      showSkeleton();
      const popularMovies = await fetchPopularMovies(this.currentPage);
      hideSkeleton();
      this.updatePage(movieService.resultsToMovies(popularMovies));
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
      hideSkeleton();
      hideLoadMoreButton();
    }
  },

  async renderSearchedMovies() {
    try {
      showSkeleton();
      const searchedMovies = await fetchSearchedMovies(this.query, this.currentPage);
      hideSkeleton();
      this.updatePage(movieService.resultsToMovies(searchedMovies));
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
      hideSkeleton();
      hideLoadMoreButton();
    }
  },

  updatePage(newMovies: Movie[]) {
    if (newMovies.length < MAX_MOVIES_PER_PAGE) {
      hideLoadMoreButton();
    }

    this.currentPage += 1;
    renderList(newMovies);
  },

  reset() {
    this.isPopular = true;
    this.query = '';
    this.currentPage = 1;
    clearList();
    showLoadMoreButton();
  },
};

export default App;
