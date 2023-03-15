import Movie from './domain/Movie';

const Store = {
  movie: new Movie(),
  movies: { results: [], nextPage: 1, query: '', category: 'popular' },

  async getPopularMovies(curPage = 1) {
    if (this.category === 'search') {
      this.movies['nextPage'] = 1;
    }

    const { results, total_pages, page } = await this.movie.getPopularMovies(curPage);

    this.movies['results'] = page === 1 ? [...results] : [...this.movies.results, ...results];
    this.movies['nextPage'] = total_pages === page ? -1 : page + 1;
    this.movies['category'] = 'popular';
  },

  async searchedMovies(query, curPage = 1) {
    if (this.category === 'popular') {
      this.movies['nextPage'] = 1;
    }

    const { results, total_pages, page } = await this.movie.findMovies(query, curPage);

    this.movies['results'] = page === 1 ? [...results] : [...this.movies.results, ...results];
    this.movies['query'] = query;
    this.movies['nextPage'] = total_pages === page ? -1 : page + 1;
    this.movies['category'] = 'search';
  },
};

export default Store;
