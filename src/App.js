import { getPopularMovies, getSearchMovies } from './api';
import { POPULAR_TITLE } from './constants';
import * as dom from './dom';
import movieService from './domain/movieService';
import { $ } from './utils/domUtils';

const App = {
  init() {
    this.pageNumber = 1;
    this.pageCategory = 'home';
    this.searchQuery = '';

    this.initMoviePage(POPULAR_TITLE);
    this.bindEvents();
    this.updateMoviePage(getPopularMovies, [this.pageNumber]);
  },

  bindEvents() {
    $('movie-header').addEventListener('home', () => {
      this.pageCategory = 'home';
      this.initMoviePage(POPULAR_TITLE);
      this.updateMoviePage(getPopularMovies, [this.pageNumber]);
    });

    $('movie-header').addEventListener('search', ({ detail }) => {
      this.pageCategory = 'search';
      this.searchQuery = detail.query;
      this.initMoviePage(`"${this.searchQuery}" 검색 결과`);
      this.updateMoviePage(getSearchMovies, [this.searchQuery, this.pageNumber]);
    });

    $('#page').addEventListener('loadMore', () => {
      if (this.pageCategory === 'home') {
        this.updateMoviePage(getPopularMovies, [this.pageNumber]);
      } else {
        this.updateMoviePage(getSearchMovies, [this.searchQuery, this.pageNumber]);
      }
    });
  },

  initMoviePage(title) {
    this.pageNumber = 1;
    movieService.resetMovies();
    dom.renderMoviePage(title);
  },

  async updateMoviePage(api, params) {
    dom.show('#skeleton-list');
    try {
      const { results, total_pages } = await api(...params);
      const newMovies = movieService.resultsToMovies(results);

      if (this.pageNumber === total_pages) dom.hide('#load-more');
      this.pageNumber += 1;

      movieService.concatMovies(newMovies);
      dom.renderMovieListItem(newMovies);
    } catch {
      hide('#load-more');
      dom.renderErrorPage();
    }

    dom.hide('#skeleton-list');
  },
};

export default App;
