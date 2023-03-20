import Movie from './domain/Movie';

import { statusCodeToErrorMessage } from './statusCode';

const Store = {
  movie: new Movie(),
  movies: {
    results: [],
    nextPage: 1,
    query: '',
    category: 'popular',
    error: {
      isError: false,
      message: '',
    },
  },

  async getPopularMovies(curPage = 1) {
    if (this.movies['category'] === 'search') {
      this.movies['nextPage'] = 1;
    }

    this.movies['category'] = 'popular';
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

      this.movies['error'] = {
        isError,
        message,
      };
    }
  },

  async searchedMovies(query, curPage = 1) {
    if (this.movies['category'] === 'popular') {
      this.movies['nextPage'] = 1;
    }

    this.movies['query'] = query;
    this.movies['category'] = 'search';
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

      this.movies['error'] = {
        isError,
        message,
      };
    }
  },

  setSkeletonArray(curPage) {
    const emptyArray = Array.from({ length: 20 }).map(() => {
      return { title: null };
    });

    this.movies['results'] = curPage === 1 ? emptyArray : [...this.movies.results, ...emptyArray];
  },

  setMovies({ results, total_pages, page }) {
    this.movies['results'] =
      page === 1 ? results : [...this.movies.results.filter(({ title }) => title), ...results];
    this.movies['nextPage'] = total_pages === page ? -1 : page + 1;
    this.movies['isError'] = false;
  },
};

export default Store;
