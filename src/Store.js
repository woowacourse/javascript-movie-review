import Movie from './domain/Movie';

const Store = {
  movie: new Movie(),
  movies: {
    results: [],
    nextPage: 1,
    query: '',
    category: 'popular',
  },

  async getPopularMovies(curPage = 1) {
    this.setSkeletonArray(curPage);

    if (this.category === 'search') {
      this.movies['nextPage'] = 1;
    }

    const { results, total_pages, page } = await this.movie.getPopularMovies(curPage);

    setTimeout(() => this.setMovies({ results, total_pages, page }, 'popular'), 500);
  },

  async searchedMovies(query, curPage = 1) {
    this.setSkeletonArray(curPage);

    if (this.category === 'popular') {
      this.movies['nextPage'] = 1;
    }

    const { results, total_pages, page } = await this.movie.findMovies(query, curPage);
    setTimeout(() => this.setMovies({ results, total_pages, page }, 'search', query), 500);
  },

  setSkeletonArray(curPage) {
    const emptyArray = Array.from({ length: 20 }).map(() => {
      return { title: null };
    });

    this.movies['results'] = curPage === 1 ? emptyArray : [...this.movies.results, ...emptyArray];
  },

  setMovies({ results, total_pages, page }, category, query) {
    this.movies['results'] =
      page === 1 ? results : [...this.movies.results.filter(({ title }) => title), ...results];
    this.movies['query'] = query;
    this.movies['nextPage'] = total_pages === page ? -1 : page + 1;
    this.movies['category'] = category;
  },
};

export default Store;
