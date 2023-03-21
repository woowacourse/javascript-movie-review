import Movie from './domain/Movie';

import { statusCodeToErrorMessage } from './statusCode';

const Store = {
  movie: new Movie(),

  state: {
    movies: [],
    nextPage: 1,
    query: '',
    category: 'popular',
    error: {
      isError: false,
      message: '',
    },
  },

  async updatePopularMovies(curPage = 1) {
    if (this.state.category === 'search') {
      this.state.nextPage = 1;
      this.state.category = 'popular';
      this.state.query = '';
    }

    this.setSkeletonArray(curPage);

    try {
      const { isError, data } = await this.movie.getPopularMovies({
        curPage,
      });

      if (isError) throw { isError, data };

      const { results, total_pages, page } = data;
      setTimeout(() => this.setMovies({ results, total_pages, page }), 500);
    } catch ({ isError, data }) {
      const message = statusCodeToErrorMessage(data.status_code);

      this.state.error = {
        isError,
        message,
      };
    }
  },

  async updateSearchedMoviesByQuery(query, curPage = 1) {
    if (this.state.category === 'popular') {
      this.state.nextPage = 1;
      this.state.category = 'search';
    }

    this.state.query = query;
    this.setSkeletonArray(curPage);

    try {
      const { isError, data } = await this.movie.findMovies({
        query,
        curPage,
      });

      if (isError) throw { isError, data };

      const { results, total_pages, page } = data;
      setTimeout(() => this.setMovies({ results, total_pages, page }, query), 500);
    } catch ({ isError, data }) {
      const message = statusCodeToErrorMessage(data.status_code);

      this.state.error = {
        isError,
        message,
      };
    }
  },

  setSkeletonArray(curPage) {
    const emptyArray = Array(20).fill({ title: null });

    this.state.movies = curPage === 1 ? emptyArray : [...this.state.movies, ...emptyArray];
  },

  setMovies({ results, total_pages, page }) {
    this.state.movies =
      page === 1 ? results : [...this.state.movies.filter(({ title }) => title), ...results];
    this.state.nextPage = total_pages === page ? -1 : page + 1;
    this.state.error = { isError: false, message: '' };
  },

  getState() {
    return this.state;
  },
};

export default Store;
