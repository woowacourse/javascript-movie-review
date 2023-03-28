import { MAX_MOVIES_PER_PAGE } from './domain/constants';
import {
  clearList,
  renderList,
  showSkeleton,
  hideSkeleton,
  hideScrollObserver,
  showScrollObserver,
} from './dom';

import { fetchPopularMovies, fetchSearchedMovies, Movie } from './domain/remotes/movies';
import { $ } from './utils/domUtils';
import { handleError } from './utils/errorHandler';
import { bindObserver } from './utils/intersectionObserver';

const App = {
  isPopular: true,
  query: '',
  currentPage: 1,

  init() {
    this.bindEvents();
    this.renderPopularMovies();
    bindObserver($('#scroll-observer')!, () => this.handleLoadMore());
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
    showScrollObserver();
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
      this.updatePage(popularMovies);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
      hideSkeleton();
      hideScrollObserver();
    }
  },

  async renderSearchedMovies() {
    try {
      showSkeleton();
      const searchedMovies = await fetchSearchedMovies(this.query, this.currentPage);
      hideSkeleton();
      this.updatePage(searchedMovies);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
      hideSkeleton();
      hideScrollObserver();
    }
  },

  updatePage(newMovies: Movie[]) {
    if (newMovies.length < MAX_MOVIES_PER_PAGE) {
      hideScrollObserver();
    }

    this.currentPage += 1;
    renderList(newMovies);
  },

  reset() {
    this.isPopular = true;
    this.query = '';
    this.currentPage = 1;
    clearList();
    showScrollObserver();
  },
};

export default App;
