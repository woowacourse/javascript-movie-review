import Movie from './domain/Movie';

const Store = {
  movie: new Movie(),
  movies: { results: [], nextPage: 1, query: '', category: 'popular' },

  async getPopularMovies(page = 1) {
    if (this.category === 'search') {
      this.movies['nextPage'] = 1;
    }

    const movieList = await this.movie.getPopularMovies(page);

    this.movies['results'] = movieList.results;
    this.movies['nextPage'] = movieList.page + 1;
    this.movies['category'] = 'popular';
  },

  async searchedMovies(query, page = 1) {
    if (this.category === 'popular') {
      this.movies['nextPage'] = 1;
    }

    const movieList = await this.movie.findMovies(query, page);

    this.movies['results'] = movieList.results;
    this.movies['query'] = query;
    this.movies['nextPage'] = movieList.page + 1;
    this.movies['category'] = 'search';
  },
};

export default Store;
