const MovieStore: MovieStoreType = {
  type: 'popular',

  popular: {
    movies: [],
    page: 1,
  },

  search: {
    movies: [],
    page: 1,
    query: '',
  },

  get movies() {
    return this[this.type].movies;
  },

  get page() {
    return this[this.type].page;
  },

  get query() {
    return this.search.query;
  },

  setMovies({ value, callback }) {
    this[this.type].movies = value;
    if (callback) callback();
  },

  setPage(value) {
    this[this.type].page = value;
  },

  setQuery(value) {
    this.search.query = value;
  },
};

export default MovieStore;
